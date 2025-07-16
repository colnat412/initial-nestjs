import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAccount_RequestDto, Login_RequestDto } from "./dto/request.dto";
import { CreateAccount_ResponseDto } from "./dto/response.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post("register")
  @HttpCode(200)
  async register(
    @Body() data: CreateAccount_RequestDto,
  ): Promise<CreateAccount_ResponseDto> {
    return await this.AuthService.register(data);
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() loginRequestDto: Login_RequestDto) {
    const { identifier, password } = loginRequestDto;
    const user = await this.AuthService.validateUser(identifier, password);
    if (!user) {
      throw new UnauthorizedException(
        "Please check your email/phone and password.",
      );
    }
    return this.AuthService.signIn(user);
  }
}
