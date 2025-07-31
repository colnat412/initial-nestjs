import { ConflictException, Injectable } from "@nestjs/common";
import {
  CreateAccount_RequestDto,
  CreateAccountResidential_RequestDto,
} from "./dto/request.dto";
import {
  CreateAccount_ResponseDto,
  CreateAccountResidential_ResponseDto,
} from "./dto/response.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { hashPassword } from "src/util/bcrypt.util";
import { RoleEnum } from "src/entity/enum/role.enum";
import { Block } from "src/entity/schema/block/block.entity";
import { Account } from "src/entity/schema/account/account.entity";
import { Profile } from "src/entity/schema/account/profile.entity";
import { Role } from "src/entity/schema/account/role.entity";
import { AccountRoles } from "src/entity/schema/account/account-roles.entity";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(AccountRoles)
    private readonly accountBlockRoleRepository: Repository<AccountRoles>,

    private dataSource: DataSource,
  ) {}

  // Register for Residential Account
  async register(
    data: CreateAccountResidential_RequestDto,
  ): Promise<CreateAccountResidential_ResponseDto> {
    const exists = await this.accountRepository.findOne({
      where: [{ email: data.email }],
    });
    if (exists) {
      throw new ConflictException("Email already exists");
    }

    const passwordHash = await hashPassword(data.password);

    const newUser = this.accountRepository.create({
      email: data.email,
      phone: data.phone,
      password: passwordHash,
    });
    await this.accountRepository.save(newUser);

    const profile = this.profileRepository.create({
      account: newUser,
    });

    await this.profileRepository.save(profile);

    newUser.profile = profile;
    await this.accountRepository.save(newUser);

    return {
      email: newUser.email,
      phone: newUser.phone,
    };
  }

  // createAccount for role-based access control
  async createAccount(
    data: CreateAccount_RequestDto,
  ): Promise<CreateAccount_ResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const exists = await this.accountRepository.findOne({
        where: [{ email: data.email }],
      });
      if (exists) {
        throw new ConflictException("Email already exists");
      }

      const passwordHash = await hashPassword(data.password);

      const newUser = this.accountRepository.create({
        email: data.email,
        phone: data.phone,
        password: passwordHash,
      });
      await queryRunner.manager.save(newUser);

      const profile = this.profileRepository.create({
        account: newUser,
      });
      await queryRunner.manager.save(profile);

      newUser.profile = profile;
      await queryRunner.manager.save(newUser);

      const role = await this.roleRepository.findOneBy({ name: data.role });
      if (!role) {
        throw new ConflictException("Role does not exist");
      }

      // switch (data.scopeType) {
      //   case ScopeType.BLOCK:
      //     const block = await queryRunner.manager.findOne(Block, {
      //       where: { id: data.scopeId },
      //     });
      //     if (!block) {
      //       throw new ConflictException("Block does not exist");
      //     }
      //     newUser.block = block;
      //     break;

      const accountBlockRole = this.accountBlockRoleRepository.create({
        account: newUser,
        role: role,
      });
      await queryRunner.manager.save(accountBlockRole);

      await queryRunner.commitTransaction();

      return {
        email: newUser.email,
        phone: newUser.phone,
        role: role.name,
        scopeType: data.scopeType,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
