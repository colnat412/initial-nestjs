import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entity/schema/account/account.entity";
import { Profile } from "src/entity/schema/account/profile.entity";
import { Role } from "src/entity/schema/account/role.entity";
import { AccountRoles } from "src/entity/schema/account/account-roles.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Account, Profile, Role, AccountRoles])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
