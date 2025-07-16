import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import { InformationServerLog } from "./util/information-server.util";
import { SwaggerBuilder } from "./common/config/swagger.config";
import { ResponseInterceptor } from "./common/interceptor/response.interceptor";
import { AllExceptionsFilter } from "./common/filter/all-exception.filter";
import { ValidatePipeConfig } from "./common/pipe/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>("PORT") || 9999;
  const hostname = configService.get<string>("HOST") || "0.0.0.0";
  const env = configService.get<string>("NODE_ENV") || "development";
  const dropSchema =
    configService.get<boolean>("DATABASE_DROP_SCHEMA") || false;

  app.use(helmet());
  app.enableCors();

  app.setGlobalPrefix(configService.get<string>("API_PREFIX") || "api");
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(ValidatePipeConfig);

  const documentFactory = () =>
    SwaggerModule.createDocument(app, SwaggerBuilder);

  SwaggerModule.setup("api", app, documentFactory, {
    jsonDocumentUrl: "swagger/json",
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(port, hostname, () => {
    InformationServerLog(port, hostname, env, dropSchema);
  });
}
void bootstrap();
