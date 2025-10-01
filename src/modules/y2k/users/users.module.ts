import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Y2KUser } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Y2KUser])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}