import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthModule } from "./app/auth/auth.module";
import { ConfigServiceModule } from "./common/config/config-serivce.module";
import { PostgresModule } from "./common/config/postgres.database.module";
import { LoggerMiddleware } from "./common/middleware/log.middleware";

@Module({
  imports: [
    ConfigServiceModule,
    PostgresModule,
    // Module Feature
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*path");
  }
}
