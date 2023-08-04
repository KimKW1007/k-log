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
import { Reply } from './reply.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment : string;

  @Column()
  userName : string;

  @Column()
  userId : number;

  @Column()
  userEmail : string;

  @Column({nullable : true})
  isSecret ?: string;

  @CreateDateColumn()
  createdAt : Date;

  @ManyToOne((type) => Board, (board) => board.comments, { eager: false })
  board : Board;

  @OneToMany(type => Reply, reply => reply.comment, {eager: true})
  replies : Reply[];
}
