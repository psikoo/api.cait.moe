import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Y2KProject } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Y2KProject])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}