import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Lecture } from './lecture.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  week: string;

  @Column('int', { nullable: false })
  sequence: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.playlist)
  user: User;

  @OneToMany(() => Lecture, (lecture) => lecture.playlist)
  lectures: Lecture[];
}
