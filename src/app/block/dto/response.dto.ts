import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateBlock_ResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt?: Date | null;

  @ApiProperty({
    description: "The name of the block",
    example: "A",
  })
  name: string;
}

export class UpdateBlock_ResponseDto extends PartialType(
  CreateBlock_ResponseDto,
) {}

export class DeleteBlock_ResponseDto {
  @ApiProperty({
    description: "The ID of the deleted block",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "Confirmation message for deletion",
    example: "Block deleted successfully",
  })
  message: string;
}

export class GetBlock_ResponseDto extends PartialType(
  CreateBlock_ResponseDto,
) {}

export class PaginatedBlock_ResponseDto extends PartialType(
  CreateBlock_ResponseDto,
) {}
