import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "src/entity/enum/role.enum";
import { ScopeType } from "src/entity/enum/scope-type";

export class CreateAccountResidential_ResponseDto {
  @ApiProperty({ example: "user@example.com" })
  email: string;

  @ApiProperty({ example: "1234567890" })
  phone: string;
}

export class CreateAccount_ResponseDto {
  @ApiProperty({ example: "user@example.com" })
  email: string;

  @ApiProperty({ example: "1234567890" })
  phone: string;

  @ApiProperty({ enum: RoleEnum, example: "admin" })
  role: RoleEnum;

  @ApiProperty({ enum: ScopeType, example: ScopeType.PROJECT })
  scopeType: ScopeType;
}
