import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Account } from "src/entity/schema/account/account.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "identifier" });
  }

  async validate(
    identifier: string,
    password: string,
  ): Promise<Omit<Account, "password">> {
    const account = await this.authService.validateUser(identifier, password);
    if (!account) throw new UnauthorizedException("Invalid credentials");

    return account;
  }
}
