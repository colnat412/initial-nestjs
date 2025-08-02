import {
  Body,
  Controller,
  HttpCode,
  Post,
  Query,
  UseFilters,
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { ApiBaseResponse } from "src/common/decorator/api-swagger/api-base-response.decorator";
import { AccountService } from "./account.service";
import { I18nValidationExceptionFilter } from "nestjs-i18n";
import {
  CreateAccount_ResponseDto,
  CreateAccountResidential_ResponseDto,
} from "./dto/response.dto";
import {
  CreateAccount_RequestDto,
  CreateAccountResidential_RequestDto,
} from "./dto/request.dto";
import { RoleEnum } from "src/entity/enum/role.enum";

@Controller("account")
@ApiBearerAuth("access-token")
export class AccountController {
  constructor(private readonly AccountService: AccountService) {}

  @Post("register-residential")
  @HttpCode(200)
  @ApiBaseResponse(CreateAccountResidential_ResponseDto)
  async register(
    @Body() data: CreateAccountResidential_RequestDto,
  ): Promise<CreateAccountResidential_ResponseDto> {
    return await this.AccountService.register(data);
  }

  @Post("create-account")
  @HttpCode(200)
  @ApiBaseResponse(CreateAccount_ResponseDto)
  async createAccount(
    @Body() data: CreateAccount_RequestDto,
  ): Promise<CreateAccount_ResponseDto> {
    return await this.AccountService.createAccount(data);
  }
}
