import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { MemosService } from './memos.service';
import { CreateMemoDTO } from './dto/create-memo.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Memo } from 'src/entities/memo.entity';
import { ReqUser } from 'src/common/decorator/user.decorator';
import { logger } from '../../src/logger';

@Controller('/api/memos')
export class MemosController {
  constructor(private readonly memosService: MemosService) {}

  @Post('write')
  async write(
    @Body() createMemoDTO: CreateMemoDTO,
    @Res() res,
    @ReqUser() reqUser,
  ) {
    logger.info(`${reqUser}`);
    await this.memosService
      .write(createMemoDTO)
      .then((value: Memo) => {
        return res.status(HttpStatus.OK).json({
          success: true,
          memo: value,
        });
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          error: err,
        });
      });
  }
}
