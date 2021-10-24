import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

export class UserDTO extends CreateUserDTO {
  @ApiProperty({
    required: true,
    example: 1,
    description: '사용자 일련번호',
  })
  id: number;

  @ApiProperty({
    required: true,
    example: '19990830',
    description: '생년원일',
  })
  birthday: string;

  @ApiProperty({
    required: true,
    example: 'OO시 OO구 OO로 OO',
    description: '주소',
  })
  address: string;
}
