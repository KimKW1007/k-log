import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title : string;

  @Column()
  link : string;
}