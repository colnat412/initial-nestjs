import { ApiProperty } from "@nestjs/swagger";

export class GetSomething_ResponseDto {
  @ApiProperty({ example: "some data" })
  data: string;

  @ApiProperty({ example: "2023-10-01T00:00:00Z" })
  timestamp: string;
}

export class Login_ResponseDto {
  @ApiProperty({ example: "user@example.com" })
  accessToken: string;
}
