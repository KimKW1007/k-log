import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubCategory } from './subCategory.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryTitle: string;

  @Column()
  dndNumber: number;

  @OneToMany((type) => SubCategory, (subCategory) => subCategory.category, {
    eager: true,
  })
  subCategories: SubCategory[];

  @ManyToOne((type) => User, (user) => user.categories, { eager: false })
  user: User;
}
