import type { GqlContent } from './../common/interfaces/gql-context.interface';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthModel } from './models/auth.model';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthModel)
  async register(
    @Context() { res }: GqlContent,
    @Args('data') input: RegisterInput,
  ) {
    return this.authService.register(res, input);
  }

  @Mutation(() => AuthModel)
  async login(@Context() { res }: GqlContent, @Args('data') input: LoginInput) {
    return this.authService.login(res, input);
  }

  @Mutation(() => AuthModel)
  async refresh(@Context() { req, res }: GqlContent) {
    return this.authService.refresh(req, res);
  }

  @Mutation(() => Boolean)
  async logout(@Context() { res }: GqlContent) {
    return this.authService.logout(res);
  }
}
