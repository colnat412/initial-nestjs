import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/entity/schema/role.entity";
import { Profile } from "src/entity/schema/profile.entity";
import { Account } from "src/entity/schema/account.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Account, Profile, Role])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
