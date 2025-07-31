import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: "List of items", isArray: true })
  items: T[];

  @ApiProperty({ description: "Total number of items" })
  total: number;

  @ApiProperty({ description: "Total number of pages" })
  totalPages: number;

  @ApiProperty({ description: "Current page" })
  page: number;

  @ApiProperty({ description: "Number of items per page" })
  pageSize: number;
}
