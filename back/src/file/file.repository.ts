import { Injectable } from '@nestjs/common';
import { FileEntity } from './file.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FileRepository extends Repository<FileEntity> {
  constructor(private dataSource: DataSource) {
    super(FileEntity, dataSource.createEntityManager());
  }



}

