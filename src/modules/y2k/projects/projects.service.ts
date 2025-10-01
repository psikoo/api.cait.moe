import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Y2KProject } from './entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Y2KProject) private readonly projectRepository: Repository<Y2KProject>) {}

  async getProjects(): Promise<Y2KProject[]> {
    return await this.projectRepository.find();
  }
  async getProject(id: number): Promise<Y2KProject> {
    const project: Y2KProject | null = await this.projectRepository.findOneBy({id});
    if(!project) throw new NotFoundException();
    else return project;
  }
  async createProject(body: CreateProjectDto): Promise<Y2KProject> {
    const project: Y2KProject = await this.projectRepository.create({
      url: body.url,
      tag: body.tag,
      sfw: body.sfw,
      name: body.name,
      description: body.description,
      date: body.date
    })
    return this.projectRepository.save(project);
  }
  async updateProject(id: number, body: UpdateProjectDto): Promise<Y2KProject> {
    const project: Y2KProject | undefined = await this.projectRepository.preload({
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
    const project: Y2KProject | null = await this.projectRepository.findOneBy({id});
    if(!project) throw new NotFoundException("Resource not found");
    else {
      this.projectRepository.remove(project);
      return JSON.parse(`{"deletedId": "${id}"}`);
    }
  }
}