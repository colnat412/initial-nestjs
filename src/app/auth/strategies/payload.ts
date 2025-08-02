import { RoleEnum } from "src/entity/enum/role.enum";

export class JwtPayload {
  sub: string; // user ID
  email: string;
  phone: string;
}
