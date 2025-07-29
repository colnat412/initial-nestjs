// decorators/api-base-response.decorator.ts
import { applyDecorators, Type } from "@nestjs/common";
import {
  ApiExtraModels,
  ApiHeader,
  ApiOkResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { BaseResponseDto } from "../dto/swagger-schema/base-response.dto";

export function ApiBaseResponse<T extends Type<any>>(model: T | [T]) {
  const isArray = Array.isArray(model);

  const targetModel = isArray ? model[0] : model;

  return applyDecorators(
    ApiExtraModels(BaseResponseDto, targetModel),
    ApiOkResponse({
      description: "Successful response",
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseDto) },
          {
            properties: {
              data: isArray
                ? {
                    type: "array",
                    items: { $ref: getSchemaPath(targetModel) },
                  }
                : { $ref: getSchemaPath(targetModel) },
            },
          },
        ],
      },
    }),
  );
}
