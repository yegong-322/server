import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class CreateUserDTO extends PickType(User, [
  'email',
  'password',
  'name',
  'phone',
  'role',
] as const) {}
