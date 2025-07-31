import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiBaseResponse } from "src/common/decorator/api-swagger/api-base-response.decorator";
import { CreateSubBlock_RequestDto } from "./dto/request.dto";
import { CreateSubBlock_ResponseDto } from "./dto/response.dto";
import { SubBlockService } from "./sub-block.service";

@Controller("SubBlock")
@ApiBearerAuth("access-token")
export class SubBlockController {
  constructor(private readonly SubBlockService: SubBlockService) {}

  @Post()
  @HttpCode(200)
  @ApiBaseResponse(CreateSubBlock_ResponseDto)
  async create(
    @Body() data: CreateSubBlock_RequestDto,
  ): Promise<CreateSubBlock_ResponseDto> {
    return await this.SubBlockService.create(data);
  }
}
