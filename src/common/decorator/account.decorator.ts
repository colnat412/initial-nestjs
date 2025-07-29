import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "src/app/auth/strategies/payload";

export const Account = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext): unknown => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();
    const user = request.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
