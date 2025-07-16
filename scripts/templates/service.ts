export const generateService = (module: string, className: string) =>
  `import { Injectable } from "@nestjs/common";
import { Create${className}_RequestDto } from "./dto/request.dto";
import { Create${className}_ResponseDto } from "./dto/response.dto";

@Injectable()
export class ${className}Service {
  constructor() {}

  async create(data: Create${className}_RequestDto): Promise<Create${className}_ResponseDto> {
    const response: Create${className}_ResponseDto = {
      title: data.title,
      description: data.description,
      isCompleted: data.isCompleted,
    };
    return response;
  }
}
`;
