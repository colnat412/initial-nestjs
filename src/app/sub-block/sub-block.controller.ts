import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiBaseResponse } from "src/common/decorator/api-swagger/api-base-response.decorator";
import {
  CreateSubBlock_RequestDto,
  UpdateSubBlock_RequestDto,
} from "./dto/request.dto";
import {
  CreateSubBlock_ResponseDto,
  DeleteSubBlock_ResponseDto,
  GetSubBlockByBlockId_ResponseDto,
  GetSubBlockById_ResponseDto,
  UpdateSubBlock_ResponseDto,
} from "./dto/response.dto";
import { SubBlockService } from "./sub-block.service";

@Controller("subBlock")
@ApiBearerAuth("access-token")
export class SubBlockController {
  constructor(private readonly subBlockService: SubBlockService) {}

  @Post("create")
  @HttpCode(200)
  @ApiBaseResponse(CreateSubBlock_ResponseDto)
  async create(
    @Body() data: CreateSubBlock_RequestDto,
  ): Promise<CreateSubBlock_ResponseDto> {
    return this.subBlockService.create(data);
  }

  @Post("update/:id")
  @HttpCode(200)
  @ApiBaseResponse(UpdateSubBlock_ResponseDto)
  async update(
    @Param("id") id: string,
    @Body() data: UpdateSubBlock_RequestDto,
  ): Promise<UpdateSubBlock_ResponseDto> {
    return this.subBlockService.update(id, data);
  }

  @Delete(":id")
  @HttpCode(200)
  @ApiBaseResponse(DeleteSubBlock_ResponseDto)
  async delete(@Param("id") id: string): Promise<DeleteSubBlock_ResponseDto> {
    return this.subBlockService.delete(id);
  }

  @Get(":id")
  @HttpCode(200)
  @ApiBaseResponse(GetSubBlockById_ResponseDto, { isArray: true })
  async getAll(@Param("id") id: string): Promise<GetSubBlockById_ResponseDto> {
    return this.subBlockService.getSubBlockById(id);
  }

  @Get("getByBlockId/:id")
  @HttpCode(200)
  @ApiBaseResponse(GetSubBlockByBlockId_ResponseDto, { isArray: true })
  async get(
    @Param("id") id: string,
  ): Promise<GetSubBlockByBlockId_ResponseDto[]> {
    return this.subBlockService.getSubBlocksByBlockId(id);
  }
}
