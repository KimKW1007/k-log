import { Injectable } from '@nestjs/common';
import { BannerRepository } from './banner.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { User } from 'src/auth/user.entity';
import { CreateProjectDto } from './dto/project.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerRepository)
    @InjectRepository(ProjectRepository)
    private bannerRepository: BannerRepository,
    private projectRepository: ProjectRepository
  ) {}

  async getBanners() {
    const banners = await this.bannerRepository.find();
    return banners ?? [];
  }
  async getProjects() {
    const projects = await this.projectRepository.find();
    return projects ?? [];
  }

  updateBanner(listNumber: string, file: Express.Multer.File, user: User) {
    return this.bannerRepository.updateBanner(listNumber, file, user);
  }

  createProject(createProjectDto : CreateProjectDto, user : User){
    return this.projectRepository.createProject(createProjectDto, user);
  }
  deleteProject(id: number, user : User){
    return this.projectRepository.deleteProject(id, user);
  }


}
