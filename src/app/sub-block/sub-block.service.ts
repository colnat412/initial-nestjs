import { Injectable } from "@nestjs/common";
import { CreateSubBlock_RequestDto } from "./dto/request.dto";
import { CreateSubBlock_ResponseDto } from "./dto/response.dto";

@Injectable()
export class SubBlockService {
  constructor() {}

  async create(data: CreateSubBlock_RequestDto): Promise<CreateSubBlock_ResponseDto> {
    const response: CreateSubBlock_ResponseDto = {
      title: data.title,
      description: data.description,
      isCompleted: data.isCompleted,
    };
    return response;
  }
}
