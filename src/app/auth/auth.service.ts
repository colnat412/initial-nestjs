import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/entity/schema/account.entity";
import { Repository } from "typeorm";
import { Login_RequestDto } from "./dto/request.dto";
import { Login_ResponseDto } from "./dto/response.dto";
import { comparePassword, hashPassword } from "src/util/bcrypt.util";
import { JwtPayload } from "./strategies/payload";
import { Profile } from "src/entity/schema/profile.entity";
import { Role } from "src/entity/schema/role.entity";

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
}
