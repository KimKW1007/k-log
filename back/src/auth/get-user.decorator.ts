import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator((data, ctx : ExecutionContext) : User =>{
  const req = ctx.switchToHttp().getRequest();
  return req.user;
})
export const GetCategories = createParamDecorator((data, ctx : ExecutionContext) : User =>{
  const req = ctx.switchToHttp().getRequest();
  return req.user.categories;
})