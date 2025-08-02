export const generateController = (
  moduleName: string,
  className: string,
): string =>
  `
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiBaseResponse } from "src/common/decorator/api-base-response.decorator";
import { ApiErrorResponses } from "src/common/decorator/api-error-response.decorator";
import { Create${className}_RequestDto } from "./dto/request.dto";
import { Create${className}_ResponseDto } from "./dto/response.dto";
import { ${className}Service } from "./${moduleName}.service";

@Controller("${className.toLowerCase()}")
@ApiBearerAuth("access-token")
export class ${className}Controller {
  constructor(private readonly ${className}Service: ${className}Service) {}

  @Post()
  @HttpCode(200)
  @ApiBaseResponse(Create${className}_ResponseDto)
  @ApiErrorResponses()
  async create(@Body() data: Create${className}_RequestDto): Promise<Create${className}_ResponseDto> {
    return await this.${className}Service.create(data);
  }
}
`.trimStart();
