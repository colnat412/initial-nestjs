import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "src/app/auth/strategies/payload";

export const Account = createParamDecorator(
  (_: keyof JwtPayload | undefined, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
