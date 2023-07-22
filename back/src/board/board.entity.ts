import { SubCategory } from 'src/category/subCategory.entity';
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
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  thumbnail : string;

  @Column()
  boardTitle: string;

  @Column()
  contents: string;

  @CreateDateColumn()
  createdAt : Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => SubCategory, (subCategory) => subCategory.boards, { eager: false })
  subCategory : SubCategory;
}
