import { applyDecorators, SetMetadata } from "@nestjs/common";
import { RoleEnum } from "src/entity/enum/role.enum";
import { ScopeType } from "src/entity/enum/scope-type";

export const Roles = (roles: RoleEnum[], scope: ScopeType) =>
  applyDecorators(SetMetadata("roles", roles), SetMetadata("scope", scope));
