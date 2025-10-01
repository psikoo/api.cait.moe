import { Controller, Headers, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Controller('y2k/projects')
export class ProjectsController {
  constructor(private readonly configService: ConfigService, private readonly projectsService: ProjectsService) {};

  @Get()
  getProjects(): Promise<Project[]> {
    return this.projectsService.getProjects();
  }
  @Get(":id")
  getProject(@Param("id") id: number): Promise<Project> {
    return this.projectsService.getProject(id);
  }
  @Post()
  createProject(@Headers('apiKey') apiKey: string, @Body() body: CreateProjectDto): Promise<Project> {
    return this.projectsService.createProject(body);
  }
  @Patch(":id")
  updateProject(@Headers('apiKey') apiKey: string, @Param("id") id: number, @Body() body: UpdateProjectDto): Promise<Project> {
    return this.projectsService.updateProject(id, body);
  }
  @Delete(":id")
  deleteProject(@Headers('apiKey') apiKey: string, @Param("id") id: number): Promise<JSON> {
    return this.projectsService.deleteProject(id);
  }
}