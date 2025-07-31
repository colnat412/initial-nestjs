import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiBaseResponse } from "src/common/decorator/api-swagger/api-base-response.decorator";
import {
  CreateBlock_RequestDto,
  PaginatedBlock_RequestDto,
  UpdateBlock_RequestDto,
} from "./dto/request.dto";
import {
  CreateBlock_ResponseDto,
  DeleteBlock_ResponseDto,
  GetBlock_ResponseDto,
  PaginatedBlock_ResponseDto,
  UpdateBlock_ResponseDto,
} from "./dto/response.dto";
import { BlockService } from "./block.service";
import { Pagination } from "src/common/decorator/pagination.decorator";
import { PaginationQueryDto } from "src/common/dto/swagger-schema/pagination/pagination.dto";
import { ApiPagination } from "src/common/decorator/api-swagger/api-pagination.decorator";
import { PaginatedResponseDto } from "src/common/dto/swagger-schema/pagination/pagination-response.dto";
import { ApiPaginatedResponse } from "src/common/decorator/api-swagger/api-pagination-response.decorator";
import { Block } from "src/entity/schema/block/block.entity";
import { JwtAuthGuard } from "src/common/guard/jwt-auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";
import { RoleEnum } from "src/entity/enum/role.enum";
import { Roles } from "src/common/decorator/roles.decorator";
import { ScopeType } from "src/entity/enum/scope-type";

@Controller("block")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([RoleEnum.ADMINISTRATOR], ScopeType.PROJECT)
export class BlockController {
  constructor(private readonly BlockService: BlockService) {}

  @Get("get/:id")
  @HttpCode(200)
  @ApiBaseResponse(GetBlock_ResponseDto)
  async get(@Param("id") id: string): Promise<GetBlock_ResponseDto> {
    return await this.BlockService.getBlock({ id });
  }

  @Post("pagination")
  @HttpCode(200)
  @ApiBaseResponse(GetBlock_ResponseDto, { isPaginated: true })
  @ApiPagination({
    sortFields: ["name", "createdAt", "updatedAt"],
  })
  async pagination(
    @Pagination() paginationQuery: PaginationQueryDto,
    @Body() filter: PaginatedBlock_RequestDto,
  ): Promise<PaginatedResponseDto<PaginatedBlock_ResponseDto>> {
    return await this.BlockService.pagination(paginationQuery, filter);
  }

  @Post("create")
  @HttpCode(200)
  @ApiBaseResponse(CreateBlock_ResponseDto)
  async create(
    @Body() data: CreateBlock_RequestDto,
  ): Promise<CreateBlock_ResponseDto> {
    return await this.BlockService.create(data);
  }

  @Post("update/:id")
  @HttpCode(200)
  @ApiBaseResponse(UpdateBlock_ResponseDto)
  async update(
    @Param("id") id: string,
    @Body() data: UpdateBlock_RequestDto,
  ): Promise<UpdateBlock_ResponseDto> {
    return await this.BlockService.update(id, data);
  }

  @Delete(":id")
  @HttpCode(200)
  @ApiBaseResponse(DeleteBlock_ResponseDto)
  async delete(@Param("id") id: string): Promise<DeleteBlock_ResponseDto> {
    return await this.BlockService.delete({ id });
  }
}
