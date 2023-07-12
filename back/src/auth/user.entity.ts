import { Exclude } from "class-transformer";
import { Category } from "src/category/category.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['userId'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id :number;

  @Column()
  userId: string;
  
  @Column()
  userName?: string;

  @Column()
  userEmail?: string;

  @Column()
  password: string;

  @OneToMany(type => Category, category => category.user, {eager: true})
  categories: Category[]
}