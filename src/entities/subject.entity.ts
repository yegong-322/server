import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Lecture } from './lecture.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  subject_name: string;

  @Column('varchar', { nullable: true })
  subject_info: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Lecture, (lecture) => lecture.subject)
  lectures: Lecture[];

  @ManyToOne(() => User, (user) => user.subjects)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
