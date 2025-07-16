export const generateRequestDto = (className: string) =>
  `
import { ApiProperty } from "@nestjs/swagger";

export class Create${className}_RequestDto {
  @ApiProperty({ example: "Buy groceries" })
  title: string;

  @ApiProperty({ example: "Milk, eggs, and bread" })
  description: string;

  @ApiProperty({ example: false })
  isCompleted: boolean;
}
`.trimStart();
