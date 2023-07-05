import { User } from "src/auth/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class SubCategory extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;

  @Column()
  categorySubTitle : string;

  @ManyToOne(type => Category, category => category.subCategories, {eager: false})
  category: Category;

}