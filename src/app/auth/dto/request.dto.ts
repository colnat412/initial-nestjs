import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

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

  @ApiProperty({ example: "+84123456789", required: true })
  @IsString({ message: "Phone number must be a string" })
  @IsNotEmpty({ message: "Phone number is required" })
  // @IsPhoneNumber("VN", { message: "Phone number is invalid" })
  phone: string;
}

export class Login_RequestDto {
  @ApiProperty({
    type: "string",
    example: "+84123456789",
  })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({
    type: "string",
    example: "password123",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class JwtPayload {
  sub: string;
  email?: string;
  phone?: string;
  role?: string;
}
