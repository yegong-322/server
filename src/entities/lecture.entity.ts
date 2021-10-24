import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Subject } from './subject.entity';
import { Playlist } from './playlist.entity';
import { Memo } from './memo.entity';
import { Review } from './review.entity';
import { Question } from './question.entity';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  lecture_name: number;

  @Column('varchar', { nullable: true })
  lecture_info: string;

  @Column('boolean', { nullable: false, default: false })
  ot: boolean;

  @Column('varchar', { nullable: false })
  vidio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Review, (review) => review.lecture)
  reviews: Review[];

  @OneToMany(() => Question, (question) => question.lecture)
  questions: Question[];

  @ManyToOne(() => Subject, (subject) => subject.lectures)
  @JoinColumn([{ name: 'subjectId', referencedColumnName: 'id' }])
  subject: Subject;

  @ManyToOne(() => Playlist, (playlist) => playlist.lectures)
  @JoinColumn([{ name: 'playlistId', referencedColumnName: 'id' }])
  playlist: Playlist;

  @ManyToOne(() => Memo, (memo) => memo.lectures)
  @JoinColumn([{ name: 'MemoId', referencedColumnName: 'id' }])
  memo: Memo;
}
