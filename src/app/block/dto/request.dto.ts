import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlock_RequestDto {
  @ApiProperty({
    description: "The name of the block",
    example: "A",
  })
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name: string;
}

export class UpdateBlock_RequestDto {
  @ApiProperty({
    description: "The name of the updated block",
    example: "A",
  })
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name: string;
}

export class PaginatedBlock_RequestDto {
  @ApiPropertyOptional({
    description: "The name of the block to filter by",
    example: "A",
    required: false,
  })
  @IsString({ message: "Name must be a string" })
  @IsOptional()
  name: string;
}
