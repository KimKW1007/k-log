import { User } from "src/auth/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;

  @Column()
  categoryTitle : string;

  @Column()
  boardTitle : string;

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(type => User, user => user.categories, {eager: false})
  user: User;

}