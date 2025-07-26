import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

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
