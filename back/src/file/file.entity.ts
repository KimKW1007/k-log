import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl : string;


  @OneToOne((type) => User, (user) => user.location, { eager: false })
  @JoinColumn()
  user: User;
}