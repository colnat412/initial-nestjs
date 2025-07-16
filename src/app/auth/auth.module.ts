import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entity/schema/account.entity";
import { Profile } from "src/entity/schema/profile.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Profile]),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        privateKey: fs.readFileSync("keys/private.pem", "utf8"),
        publicKey: fs.readFileSync("keys/public.pem", "utf8"),
        signOptions: {
          algorithm: "RS256",
          expiresIn: configService.get<string>("JWT_EXPIRES_IN") || "24h",
        },
        verifyOptions: {
          algorithms: ["RS256"],
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
