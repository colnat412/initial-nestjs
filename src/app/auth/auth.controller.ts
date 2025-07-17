import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guard/auth.guard";
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
  async login(@Body() dto: Login_RequestDto) {
    return await this.AuthService.signIn(dto);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(AuthGuard)
  @Get("something")
  async getSomething() {
    return this.AuthService.getSomething();
  }
}
