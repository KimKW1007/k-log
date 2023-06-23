import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import * as config from "config"


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UserRepository)
    private userRepository : UserRepository
  ){
    super({
      secretOrKey : process.env.JWT_ACCESS_TOKEN_SECRET || config.get("jwt.secret"),
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload : User){
    const {userId} = payload;
    const user: User = await this.userRepository.findOneBy({userId})
    if(!user){
      throw new UnauthorizedException();
    }
    delete user.password
    return user;
  }
}