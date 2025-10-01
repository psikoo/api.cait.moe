import { Body, Controller, Delete, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Y2KUser } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('y2k/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {};

  @Get()
  getUsers(): Promise<Y2KUser[]> {
    return this.userService.getUsers();
  }
  @Get(":id")
  getUser(@Param("id") id: number): Promise<Y2KUser> {
    return this.userService.getUser(id);
  }
  @Post()
  createUser(@Headers('apiKey') apiKey: string, @Body() body: CreateUserDto): Promise<Y2KUser> {
    return this.userService.createUser(body);
  }
  @Patch(":id")
  updateUser(@Headers('apiKey') apiKey: string, @Param("id") id: number, @Body() body: UpdateUserDto): Promise<Y2KUser> {
    return this.userService.updateUser(id, body);
  }
  @Delete(":id")
  deleteUser(@Headers('apiKey') apiKey: string, @Param("id") id: number): Promise<JSON> {
    return this.userService.deleteUser(id);
  }
}