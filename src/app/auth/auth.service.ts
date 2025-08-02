import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/entity/schema/account/account.entity";
import { comparePassword } from "src/util/bcrypt.util";
import { Repository } from "typeorm";
import { Login_RequestDto } from "./dto/request.dto";
import { JwtPayload } from "./strategies/payload";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    identifier: string,
    password: string,
  ): Promise<Omit<Account, "password"> | null> {
    const user = await this.accountRepository.findOne({
      where: [{ email: identifier }, { phone: identifier }],
    });

    if (user && (await comparePassword(password, user.password))) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: Login_RequestDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(data.identifier, data.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      phone: user.phone,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getSomething() {
    return "This is a placeholder response from AuthService.";
  }

  async getAccountById(id: string): Promise<Account | null> {
    return await this.accountRepository.findOne({
      where: { id },
      relations: ["accountRoles"],
    });
  }
}
