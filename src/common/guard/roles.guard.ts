import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleEnum } from "src/entity/enum/role.enum";
import { ScopeType } from "src/entity/enum/scope-type";
import { Account } from "src/entity/schema/account/account.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      "roles",
      [context.getHandler(), context.getClass()],
    );
    const requiredScope = this.reflector.getAllAndOverride<ScopeType>("scope", [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<{
      user: Account;
      params: { scopeId: string | null };
    }>();
    const user = request.user;
    const scopeId = request.params.scopeId ?? null;
    console.log(user, scopeId);

    if (!requiredRoles || !requiredScope) return true;

    if (!user?.accountRoles) {
      throw new ForbiddenException("No roles assigned");
    }

    const hasAccess = user.accountRoles.some(
      (ar) =>
        requiredRoles.includes(ar.role.name) &&
        ar.scopeType === requiredScope &&
        (ar.scopeId === null || ar.scopeId === scopeId),
    );

    if (!hasAccess) {
      throw new ForbiddenException("Insufficient role or scope");
    }

    return true;
  }
}
