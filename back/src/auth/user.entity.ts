import { Exclude } from "class-transformer";
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

  @Column({select:false})
  password: string;

}