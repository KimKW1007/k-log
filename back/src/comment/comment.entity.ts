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

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment : string;

  @Column()
  userName : string;

  @Column()
  userEmail : string;

  @CreateDateColumn()
  createdAt : Date;

  @ManyToOne((type) => Board, (board) => board.comment, { eager: false })
  board : Board;

}
