import { Body, Controller, HttpCode, Post, UseFilters } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiBaseResponse } from "src/common/decorator/api-base-response.decorator";
import { CreateAccount_RequestDto } from "./dto/request.dto";
import { CreateAccount_ResponseDto } from "./dto/response.dto";
import { AccountService } from "./account.service";
import { I18nValidationExceptionFilter } from "nestjs-i18n";

@Controller("account")
@ApiBearerAuth("access-token")
export class AccountController {
  constructor(private readonly AccountService: AccountService) {}

  @Post("register")
  @HttpCode(200)
  @ApiBaseResponse(CreateAccount_ResponseDto)
  @UseFilters(new I18nValidationExceptionFilter())
  async register(
    @Body() data: CreateAccount_RequestDto,
  ): Promise<CreateAccount_ResponseDto> {
    return await this.AccountService.register(data);
  }
}
