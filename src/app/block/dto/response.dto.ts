import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntityDto } from "src/common/dto/swagger-schema/base-entity.dto";

export class BaseBlock_ResponseDto extends PartialType(BaseEntityDto) {
  @ApiProperty({
    description: "The name of the block",
    example: "A",
  })
  @Expose()
  name: string;
}

export class CreateBlock_ResponseDto extends PartialType(
  BaseBlock_ResponseDto,
) {}

export class UpdateBlock_ResponseDto extends PartialType(
  BaseBlock_ResponseDto,
) {}

export class PaginatedBlock_ResponseDto extends PartialType(
  BaseBlock_ResponseDto,
) {}

export class GetBlock_ResponseDto extends PartialType(BaseBlock_ResponseDto) {}

export class GetBlockActive_ResponseDto extends PartialType(
  BaseBlock_ResponseDto,
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
