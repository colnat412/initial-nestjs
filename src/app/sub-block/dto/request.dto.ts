import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSubBlock_RequestDto {
  @ApiProperty({
    description: "The name of the sub-block",
    example: "A",
  })
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @ApiProperty({
    description: "The ID of the parent block",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString({ message: "Block ID must be a string" })
  @IsNotEmpty({ message: "Block ID is required" })
  blockId: string;
}

export class UpdateSubBlock_RequestDto {
  @ApiProperty({
    description: "The name of the updated sub-block",
    example: "A",
  })
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  name: string;
}
