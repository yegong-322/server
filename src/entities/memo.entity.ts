import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Lecture } from './lecture.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class Memo {
  @ApiProperty({
    example: 1,
    description: '메모장 일련번호',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '공부하기 싫어요',
    description: '메모',
  })
  @Column('varchar')
  memo_text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.memo)
  user: User;

  @OneToMany(() => Lecture, (lecture) => lecture.memo)
  lectures: Lecture[];
}
