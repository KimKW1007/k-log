import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FindId extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token : string;

  @Column()
  userEmail : string;


}