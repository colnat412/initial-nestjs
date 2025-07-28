import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
// import { AuthGuard } from "src/common/guard/auth.guard";
import { Account } from "src/common/decorator/account.decorator";
import { ApiBaseResponse } from "src/common/decorator/api-base-response.decorator";
import { JwtAuthGuard } from "src/common/guard/jwt-auth.guard";
import { LocalAuthGuard } from "src/common/guard/local-auth.guard";
import { AuthService } from "./auth.service";
import { Login_RequestDto } from "./dto/request.dto";
import { Login_ResponseDto } from "./dto/response.dto";
import { JwtPayload } from "./strategies/payload";

@Controller("auth")
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiBaseResponse(Login_ResponseDto)
  async login(@Body() data: Login_RequestDto) {
    return await this.AuthService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiBaseResponse(String) // WRONG TYPE, IT SHOULD BE A DTO CLASS
  @Get("something")
  async getSomething(@Account() account: JwtPayload): Promise<string> {
    return account.phone;
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/logout")
  async logout(@Request() req) {
    return req.logout();
  }
}
