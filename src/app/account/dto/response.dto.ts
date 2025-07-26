import { ApiProperty } from "@nestjs/swagger";

export class CreateAccount_ResponseDto {
  @ApiProperty({ example: "user@example.com" })
  email: string;

  @ApiProperty({ example: "1234567890" })
  phone: string;
}
