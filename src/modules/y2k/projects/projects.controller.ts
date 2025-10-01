import { Controller, Headers, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Y2KProject } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Controller('y2k/projects')
export class ProjectsController {
  constructor(private readonly configService: ConfigService, private readonly projectsService: ProjectsService) {};

  @Get()
  getProjects(): Promise<Y2KProject[]> {
    return this.projectsService.getProjects();
  }
  @Get(":id")
  getProject(@Param("id") id: number): Promise<Y2KProject> {
    return this.projectsService.getProject(id);
  }
  @Post()
  createProject(@Headers('apiKey') apiKey: string, @Body() body: CreateProjectDto): Promise<Y2KProject> {
    return this.projectsService.createProject(body);
  }
  @Patch(":id")
  updateProject(@Headers('apiKey') apiKey: string, @Param("id") id: number, @Body() body: UpdateProjectDto): Promise<Y2KProject> {
    return this.projectsService.updateProject(id, body);
  }
  @Delete(":id")
  deleteProject(@Headers('apiKey') apiKey: string, @Param("id") id: number): Promise<JSON> {
    return this.projectsService.deleteProject(id);
  }
}