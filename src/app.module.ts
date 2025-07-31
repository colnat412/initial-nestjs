import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AuthModule } from "./app/auth/auth.module";
import { ConfigServiceModule } from "./common/config/config-service.module";
import { PostgresModule } from "./common/config/postgres.database.module";
import { LoggerMiddleware } from "./common/middleware/log.middleware";
import { SeedService } from "./seed/seed.service";
import { AccountModule } from "./app/account/account.module";
import { I18nConfigModule } from "./common/config/i18n.module";
import { SubBlockModule } from "./app/sub-block/sub-block.module";
import { BlockModule } from "./app/block/block.module";

@Module({
  imports: [
    ConfigServiceModule,
    PostgresModule,
    I18nConfigModule,
    // Module Feature
    AuthModule,
    AccountModule,

    // Index
    BlockModule,
    SubBlockModule,
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*path");
  }
}
