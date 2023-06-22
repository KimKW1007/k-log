import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['userId'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id :number;

  @Column()
  userId: string;

  @Column()
  password: string;

}