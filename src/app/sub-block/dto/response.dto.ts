import { ApiProperty } from "@nestjs/swagger";

export class CreateSubBlock_ResponseDto {
  @ApiProperty({ example: "Buy groceries" })
  title: string;

  @ApiProperty({ example: "Milk, eggs, and bread" })
  description: string;

  @ApiProperty({ example: false })
  isCompleted: boolean;
}
