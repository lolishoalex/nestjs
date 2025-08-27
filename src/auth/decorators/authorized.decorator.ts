/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

export const Authorized = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext().req;

    const user = request.user as User;

    return data ? user[data] : user;
  },
);
