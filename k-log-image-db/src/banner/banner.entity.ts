import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Banner extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl : string;

  @Column()
  listNumber : string;

}