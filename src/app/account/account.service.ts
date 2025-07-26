import { ConflictException, Injectable } from "@nestjs/common";
import { CreateAccount_RequestDto } from "./dto/request.dto";
import { CreateAccount_ResponseDto } from "./dto/response.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/entity/schema/account.entity";
import { Profile } from "src/entity/schema/profile.entity";
import { Repository } from "typeorm";
import { hashPassword } from "src/util/bcrypt.util";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async register(
    data: CreateAccount_RequestDto,
  ): Promise<CreateAccount_ResponseDto> {
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
}
