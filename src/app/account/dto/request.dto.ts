import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { RoleEnum } from "src/entity/enum/role.enum";
import { ScopeType } from "src/entity/enum/scope-type";
import { IsNull } from "typeorm";

export class CreateAccountResidential_RequestDto {
  @ApiProperty({ example: "user@gmail.com", required: true })
  @IsString({ message: "Email is invalid" })
  @IsEmail(
    { host_whitelist: ["gmail.com", "yahoo.com", "outlook.com"] },
    { message: "Email is invalid" },
  )
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @ApiProperty({ example: "password123", required: true })
  @IsString({ message: "Password is invalid" })
  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @ApiProperty({ example: "0123456789", required: true })
  @IsString({ message: "Phone number must be a string" })
  @IsNotEmpty({ message: "Phone number is required" })
  // @IsPhoneNumber("VN", { message: "Phone number is invalid" })
  phone: string;
}

export class CreateAccount_RequestDto {
  @ApiProperty({ example: "user@gmail.com", required: true })
  @IsString({ message: "Email is invalid" })
  @IsEmail(
    { host_whitelist: ["gmail.com", "yahoo.com", "outlook.com"] },
    { message: "Email is invalid" },
  )
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @ApiProperty({ example: "password123", required: true })
  @IsString({ message: "Password is invalid" })
  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @ApiProperty({ example: "0123456789", required: true })
  @IsString({ message: "Phone number must be a string" })
  @IsNotEmpty({ message: "Phone number is required" })
  phone: string;

  @ApiProperty({ enum: RoleEnum, example: RoleEnum.RECEPTION, required: true })
  @IsString({ message: "Role is invalid" })
  @IsNotEmpty({ message: "Role is required" })
  @IsEnum(RoleEnum, { message: "Role is invalid" })
  role: RoleEnum;

  @ApiProperty({ enum: ScopeType, example: ScopeType.PROJECT, required: true })
  @IsString({ message: "Scope type is invalid" })
  @IsNotEmpty({ message: "Scope type is required" })
  @IsEnum(ScopeType, { message: "Scope type is invalid" })
  scopeType: ScopeType;

  @ApiPropertyOptional({
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: false,
  })
  @IsOptional()
  scopeId?: string | null;
}
