import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Y2kProject } from './entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Y2kProject) private readonly projectRepository: Repository<Y2kProject>) {}

  async getProjects(): Promise<Y2kProject[]> {
    return await this.projectRepository.find();
  }
  async getProject(id: number): Promise<Y2kProject> {
    const project: Y2kProject | null = await this.projectRepository.findOneBy({id});
    if(!project) throw new NotFoundException();
    else return project;
  }
  async createProject(body: CreateProjectDto): Promise<Y2kProject> {
    const project: Y2kProject = await this.projectRepository.create({
      url: body.url,
      tag: body.tag,
      sfw: body.sfw,
      name: body.name,
      description: body.description,
      date: body.date
    })
    return this.projectRepository.save(project);
  }
  async updateProject(id: number, body: UpdateProjectDto): Promise<Y2kProject> {
    const project: Y2kProject | undefined = await this.projectRepository.preload({
      id,
      url: body.url,
      tag: body.tag,
      sfw: body.sfw,
      name: body.name,
      description: body.description,
      date: body.date
    })
    if(!project) throw new NotFoundException("Resource not found");
    else this.projectRepository.save(project);
    return project;
  }
  async deleteProject(id: number): Promise<JSON> {
    const project: Y2kProject | null = await this.projectRepository.findOneBy({id});
    if(!project) throw new NotFoundException("Resource not found");
    else {
      this.projectRepository.remove(project);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}