import { Repository } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,

} from 'class-validator';
import { Comment } from '../comment.entity';

export class CommentCreateDto extends Repository<Comment> {
  @IsNotEmpty()
  comment: string;

  @IsString()
  isSecret ?: string;
}
