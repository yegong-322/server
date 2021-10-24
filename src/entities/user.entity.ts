import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Review } from './review.entity';
import { Answer } from './answer.entity';
import { Subject } from './subject.entity';
import { Playlist } from './playlist.entity';
import { Memo } from './memo.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @ApiProperty({
    example: 1,
    description: '사용자 일련번호',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'yean0830@naver.com',
    description: '아이디(이메일)',
  })
  @Column('varchar', { name: 'email', unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'yean322!',
    description: '비밀번호',
  })
  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '김민지',
    description: '이름',
  })
  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '01012345678',
    description: '핸드폰 번호',
  })
  @Column('varchar', { name: 'phone', length: 11, unique: true })
  phone: string;

  @IsString()
  @ApiProperty({
    example: '19990830',
    description: '생년월일',
  })
  @Column('varchar', { nullable: true })
  birthday: string;

  @IsString()
  @ApiProperty({
    example: 'OO시 OO구 OO로 OO',
    description: '주소',
  })
  @Column('varchar', { nullable: true })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'student',
    description: '직업',
  })
  @Column('varchar', { name: 'role', default: 'student' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne(() => Memo, (memo) => memo.user)
  @JoinColumn()
  memo: Memo;

  @OneToOne(() => Playlist, (playlist) => playlist.user)
  @JoinColumn()
  playlist: Playlist;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @OneToMany(() => Subject, (subject) => subject.user)
  subjects: Subject[];
}
