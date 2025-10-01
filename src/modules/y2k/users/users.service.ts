import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Y2kUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Y2kUser) private readonly userRepository: Repository<Y2kUser>) {}

  async getUsers(): Promise<Y2kUser[]> {
    return await this.userRepository.find();
  }
  async getUser(id: number): Promise<Y2kUser> {
    const user: Y2kUser | null = await this.userRepository.findOneBy({id});
    if(!user) throw new NotFoundException();
    else return user;
  }
  async createUser(body: CreateUserDto): Promise<Y2kUser> {
    const user: Y2kUser = await this.userRepository.create({
      name: body.name,
      age: body.age,
      birthday: body.birthday,
      gender: body.gender,
      pronouns: body.pronouns,
      orientation: body.orientation,
      quote: body.quote,
      intro: body.intro,
      mood: body.mood,
      linkName: body.linkName,
      urlString: body.urlString
    })
    return this.userRepository.save(user);
  }
  async updateUser(id: number, body: UpdateUserDto): Promise<Y2kUser> {
    const user: Y2kUser | undefined = await this.userRepository.preload({
      id,
      name: body.name,
      age: body.age,
      birthday: body.birthday,
      gender: body.gender,
      pronouns: body.pronouns,
      orientation: body.orientation,
      quote: body.quote,
      intro: body.intro,
      mood: body.mood,
      linkName: body.linkName,
      urlString: body.urlString
    })
    if(!user) throw new NotFoundException("Resource not found");
    else this.userRepository.save(user);
    return user;
  }
  async deleteUser(id: number): Promise<JSON> {
    const user: Y2kUser | null = await this.userRepository.findOneBy({id});
    if(!user) throw new NotFoundException("Resource not found");
    else {
      this.userRepository.remove(user);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}