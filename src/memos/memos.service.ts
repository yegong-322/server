import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memo } from 'src/entities/memo.entity';
import { Repository } from 'typeorm';
import { CreateMemoDTO } from './dto/create-memo.dto';

@Injectable()
export class MemosService {
  constructor(
    @InjectRepository(Memo)
    private memosRepository: Repository<Memo>,
  ) {}

  async write(createMemoDTO: CreateMemoDTO) {
    const memo = new Memo();
    memo.memo_text = createMemoDTO.memo_text;

    return this.memosRepository.save(memo);
  }
}
