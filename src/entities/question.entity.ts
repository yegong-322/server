import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Lecture } from './lecture.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  question_text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Answer, (answer) => answer.question)
  @JoinColumn()
  answer: Answer;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Lecture, (lecture) => lecture.questions)
  @JoinColumn([{ name: 'lectureId', referencedColumnName: 'id' }])
  lecture: Lecture;
}
