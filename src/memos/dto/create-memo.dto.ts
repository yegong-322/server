import { PickType } from '@nestjs/swagger';
import { Memo } from 'src/entities/memo.entity';

export class CreateMemoDTO extends PickType(Memo, ['memo_text'] as const) {}
