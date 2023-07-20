import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Images extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl : string;

  @Column()
  userId : string;

  @Column()
  subTitle ?: string;

  @Column()
  boardId ?: string;

}