import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Banner extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  listNumber : string;

  @Column()
  imageUrl : string;
}