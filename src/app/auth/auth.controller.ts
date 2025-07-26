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
import { AuthService } from "./auth.service";
import { Login_RequestDto } from "./dto/request.dto";
import {
  Login_ResponseDto,
} from "./dto/response.dto";
import { ApiBaseResponse } from "src/common/decorator/api-base-response.decorator";
import { ApiErrorResponses } from "src/common/decorator/api-error-response.decorator";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "./strategies/payload";
import { Account as AccountEntity } from "src/entity/schema/account.entity";
import { JwtAuthGuard } from "src/common/guard/jwt-auth.guard";
import { LocalAuthGuard } from "src/common/guard/local-auth.guard";
import { Account } from "src/common/decorator/account.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiBaseResponse(Login_ResponseDto)
  @ApiErrorResponses()
  async login(@Request() req: { user: Omit<AccountEntity, "password"> }) {
    return await this.AuthService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiBaseResponse(String) // WRONG TYPE, IT SHOULD BE A DTO CLASS
  @ApiErrorResponses()
  @Get("something")
  async getSomething(@Account() account: JwtPayload): Promise<string> {
    return account.phone;
  }
}
