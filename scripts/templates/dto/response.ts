export const generateResponseDto = (className: string) =>
  `
import { ApiProperty } from "@nestjs/swagger";

export class Create${className}_ResponseDto {
  @ApiProperty({ example: "Buy groceries" })
  title: string;

  @ApiProperty({ example: "Milk, eggs, and bread" })
  description: string;

  @ApiProperty({ example: false })
  isCompleted: boolean;
}
`.trimStart();
