import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/project.dto';
import { User } from 'src/auth/user.entity';


@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor(private dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }
  async createProject(createProjectDto : CreateProjectDto, user : User){
    const {title, link} = createProjectDto;
    if(user.id !== 1) throw new UnauthorizedException('관리자 권한이 없습니다.')
    const createProject = this.create({
      title, link
    })
    await this.save(createProject)
  }

  async deleteProject(id:number, user : User){
    if(user.id !== 1) throw new UnauthorizedException('관리자 권한이 없습니다.')
    const found = await this.findOneBy({id});
    if(!found){
      throw new BadRequestException('삭제할 프로젝트가 없습니다.')
    }
    await this.delete({id});
    return {message : 'success'}
  }
}