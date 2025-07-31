import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JWTStrategy } from "src/app/auth/strategies/jwt.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { Account } from "src/entity/schema/account/account.entity";
import { Profile } from "src/entity/schema/account/profile.entity";
import { Role } from "src/entity/schema/account/role.entity";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Account, Profile, Role]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRATION_TIME"),
          algorithm: "HS256",
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, LocalStrategy],
})
export class AuthModule {}
