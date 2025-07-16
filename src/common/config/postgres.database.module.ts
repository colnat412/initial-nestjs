import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          ssl: {
            rejectUnauthorized: false,
          },
          host: configService.get<string>("POSTGRES_HOST"),
          port: configService.get<number>("POSTGRES_PORT"),
          username: configService.get<string>("POSTGRES_USER"),
          password: configService.get<string>("POSTGRES_PASSWORD"),
          database: configService.get<string>("POSTGRES_DB"),
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: configService.get<boolean>("DATABASE_DROP_SCHEMA", false),
        };
      },
    }),
  ],
  exports: [],
  providers: [],
})
export class PostgresModule implements OnModuleInit {
  onModuleInit() {}
}
