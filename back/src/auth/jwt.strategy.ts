import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();
const configService = new ConfigService();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UserRepository)
    private userRepository : UserRepository
  ){
    super({
      secretOrKey : configService.get('JWT_ACCESS_TOKEN_SECRET'),
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload : User){
    const {id} = payload;
    const user: User = await this.userRepository.findOneBy({id})
    if(!user){
      throw new UnauthorizedException();
    }
    delete user.password
    return user;
  }
}