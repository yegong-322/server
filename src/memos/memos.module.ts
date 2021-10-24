import { Module } from '@nestjs/common';
import { MemosService } from './memos.service';
import { MemosController } from './memos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from 'src/entities/memo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Memo])],
  providers: [MemosService],
  controllers: [MemosController],
})
export class MemosModule {}
