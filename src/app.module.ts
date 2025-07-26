import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthModule } from "./app/auth/auth.module";
import { ConfigServiceModule } from "./common/config/config-service.module";
import { PostgresModule } from "./common/config/postgres.database.module";
import { LoggerMiddleware } from "./common/middleware/log.middleware";
import { SeedService } from "./seed/seed.service";
import { AccountModule } from "./app/account/account.module";

@Module({
  imports: [
    ConfigServiceModule,
    PostgresModule,
    // Module Feature
    AuthModule,
    AccountModule,
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*path");
  }
}
