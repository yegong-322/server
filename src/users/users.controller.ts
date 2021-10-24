import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in-guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in-guard';
import { ReqUser } from 'src/common/decorator/user.decorator';
import { UserDTO } from 'src/common/dto/user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'success',
    type: UserDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'error',
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Get('mypage')
  getMyInfo(@ReqUser() reqUser) {
    return reqUser || false;
  }

  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() body: CreateUserDTO) {
    await this.usersService.signup(
      body.email,
      body.password,
      body.name,
      body.phone,
      body.role,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'success',
    type: UserDTO,
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(new LocalAuthGuard())
  @Post('login')
  login(@ReqUser() reqUser) {
    return reqUser;
  }

  @UseGuards(new LoggedInGuard())
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(new LoggedInGuard())
  @Post('logout')
  async logout(@Res() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.status(HttpStatus.OK).json({
      success: true,
      description: '로그아웃 되었습니다.',
    });
  }
}
