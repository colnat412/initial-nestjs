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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, password: string) {
    const user = await this.accountRepository.findOne({
      where: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return null;
    }

    const match = await comparePassword(password, user.password);
    return match ? user : null;
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

  async signIn(dto: Login_RequestDto): Promise<Login_ResponseDto> {
    const user = await this.validateUser(dto.identifier, dto.password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = {
      sub: user.id,
      email: user.email,
      phone: user.phone,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getSomething() {
    return "This is a placeholder response from AuthService.";
  }
}
