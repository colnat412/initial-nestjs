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

export class GetBlock_RequestDto {
  @ApiProperty({
    description: "The ID of the block to retrieve",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString({ message: "ID must be a string" })
  @IsNotEmpty({ message: "ID is required" })
  id: string;
}

export class DeleteBlock_RequestDto extends PartialType(GetBlock_RequestDto) {}

export class PaginatedBlock_RequestDto {
  @ApiPropertyOptional({
    description: "The name of the block to filter by",
    example: "A",
    required: false,
  })
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  @IsOptional()
  name?: string;
}
