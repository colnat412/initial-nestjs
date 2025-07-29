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
import { I18nLang, I18nService } from "nestjs-i18n";
import { Account } from "src/common/decorator/account.decorator";
import { ApiBaseResponse } from "src/common/decorator/api-base-response.decorator";
import { JwtAuthGuard } from "src/common/guard/jwt-auth.guard";
import { LocalAuthGuard } from "src/common/guard/local-auth.guard";
import { I18nTranslations } from "src/i18n/generated/i18n.generated";
import { AuthService } from "./auth.service";
import { Login_RequestDto } from "./dto/request.dto";
import { Login_ResponseDto } from "./dto/response.dto";
import { JwtPayload } from "./strategies/payload";

@Controller("auth")
export class AuthController {
  constructor(
    private i18n: I18nService<I18nTranslations>,
    private readonly AuthService: AuthService,
  ) {}

  @Post("login")
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiBaseResponse(Login_ResponseDto)
  async login(@Body() data: Login_RequestDto) {
    return await this.AuthService.login(data);
  }

  @Get("something")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiBaseResponse(String) // WRONG TYPE, IT SHOULD BE A DTO CLASS
  async getSomething(
    @I18nLang() lang: string,
    @Account() account: JwtPayload,
  ): Promise<string> {
    console.log("lang", lang);
    return this.i18n.translate("common.HELLO", {
      lang,
    });
  }

  @Post("logout")
  @UseGuards(LocalAuthGuard)
  async logout(@Request() req) {
    return req.logout();
  }
}
