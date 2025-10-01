import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Y2kUser } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Y2kUser])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}