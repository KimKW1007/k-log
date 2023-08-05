import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl : string;

  @Column()
  description : string;

  @OneToOne((type) => User, (user) => user.location, { onDelete: 'CASCADE',  eager: false })
  @JoinColumn()
  user: User;
}