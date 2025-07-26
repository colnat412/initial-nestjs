import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, ".env"],
      validationSchema: Joi.object({
        // App
        PORT: Joi.number().default(3000),
        HOST: Joi.string().default("localhost"),
        API_PREFIX: Joi.string().default("api"),

        DOMAIN: Joi.string().required(),
        FULL_DOMAIN: Joi.string().required(),

        // JWT
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().default("1d"),

        // Schema
        DATABASE_DROP_SCHEMA: Joi.boolean()
          .truthy("true", "1")
          .falsy("false", "0")
          .default(false),

        // Postgres
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),

        // Redis
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().default(6379),

        // Brevo (Sendinblue)
        SENDINBLUE_API_KEY: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigServiceModule implements OnModuleInit {
  onModuleInit() {}
}
