import { Exclude } from "class-transformer";
import { Category } from "src/category/category.entity";
import { FileEntity } from "src/file/file.entity";
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

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

  @Column({ nullable: true })
  isAdmin: string;

  @OneToMany(type => Category, category => category.user, {eager: true, cascade: ['remove'] })
  categories: Category[]

  @OneToOne(type => FileEntity, file => file.user, {eager: true, cascade: ['remove'] })
  location : FileEntity

  @Column({ nullable: true })
  currentRefreshToken: string;

  @Column({ nullable: true })
  currentRefreshTokenExp: Date;
}