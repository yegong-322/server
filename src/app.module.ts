import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MemosModule } from './memos/memos.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { SubjectsModule } from './subjects/subjects.module';
import { LecturesModule } from './lectures/lectures.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { ReviewsModule } from './reviews/reviews.module';
import { User } from './entities/user.entity';
import { Subject } from './entities/subject.entity';
import { Review } from './entities/review.entity';
import { Question } from './entities/question.entity';
import { Playlist } from './entities/playlist.entity';
import { Memo } from './entities/memo.entity';
import { Lecture } from './entities/lecture.entity';
import { Answer } from './entities/answer.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    MemosModule,
    PlaylistsModule,
    SubjectsModule,
    LecturesModule,
    QuestionsModule,
    AnswersModule,
    ReviewsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'KIP',
      entities: [
        User,
        Subject,
        Review,
        Question,
        Playlist,
        Memo,
        Lecture,
        Answer,
      ],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
