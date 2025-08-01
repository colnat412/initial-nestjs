import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntityDto } from "src/common/dto/swagger-schema/base-entity.dto";

export class BaseSubBlock_ResponseDto extends PartialType(BaseEntityDto) {
  @ApiProperty({
    description: "The name of the sub-block",
    example: "A-01",
  })
  @Expose()
  name: string;
}

export class CreateSubBlock_ResponseDto extends PartialType(
  BaseSubBlock_ResponseDto,
) {}

export class UpdateSubBlock_ResponseDto extends PartialType(
  CreateSubBlock_ResponseDto,
) {}

export class GetSubBlockById_ResponseDto extends PartialType(
  CreateSubBlock_ResponseDto,
) {}

export class GetSubBlockByBlockId_ResponseDto extends PartialType(
  CreateSubBlock_ResponseDto,
) {}

export class DeleteSubBlock_ResponseDto {
  @ApiProperty({
    description: "The ID of the deleted sub-block",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "Confirmation message for deletion",
    example: "Sub-block deleted successfully",
  })
  message: string;
}
