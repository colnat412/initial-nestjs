import { ApiProperty } from "@nestjs/swagger";

// This entity will be used as a base for other entities

export class BaseEntityDto {
  @ApiProperty({
    description: "The unique identifier of the entity",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "The date and time when the entity was created",
    example: "2023-10-01T12:00:00Z",
  })
  createdAt: Date;
  @ApiProperty({
    description: "The date and time when the entity was last updated",
    example: "2023-10-01T12:00:00Z",
  })
  updatedAt: Date;

  @ApiProperty({
    description: "The date and time when the entity was deleted, if applicable",
    example: "2023-10-01T12:00:00Z",
    required: false,
  })
  deletedAt?: Date | null;
}
