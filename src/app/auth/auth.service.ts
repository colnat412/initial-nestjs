import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/entity/schema/account.entity";
import { Repository } from "typeorm";
import { CreateAccount_RequestDto, Login_RequestDto } from "./dto/request.dto";
import {
  CreateAccount_ResponseDto,
  Login_ResponseDto,
} from "./dto/response.dto";
import { comparePassword, hashPassword } from "src/util/bcrypt.util";
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
    return {
      email: newUser.email,
      phone: newUser.phone,
    };
  }
  async login(
    user: Omit<Account, "password">,
  ): Promise<{ access_token: string }> {
    console.log("Logging in user:", user);
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
