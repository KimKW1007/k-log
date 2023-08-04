import { Board } from 'src/board/board.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  replyComment : string;

  @Column()
  userName : string;

  @Column()
  userId : number;

  @Column()
  userEmail : string;

  @Column()
  isSecret ?: string;

  @CreateDateColumn()
  createdAt : Date;

  @ManyToOne((type) => Comment, (comment) => comment.replies, { eager: false })
  comment : Comment;

}
