import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ILike, LessThan, MoreThan, Not } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) {}
  private TAKE = 6;

  async createBoard(body, file: Express.Multer.File, user: User) {
    return this.boardRepository.createBoard(body, file, user);
  }

  async createLastBoardId(user: User) {
    return this.boardRepository.createLastBoardId(user);
  }

  async searchBoard(searchValue: string) {
    if (!searchValue) {
      return []; // 검색어가 없으면 빈 배열 반환
    }
    return this.boardRepository.find({ where: [{ boardTitle: ILike(`%${searchValue}%`) }, { tags: ILike(`%${searchValue}%`) }, { contents: ILike(`%${searchValue}%`) }], select: { id: true, boardTitle: true, tags: true, contents: true } });
  }

  async getBoard(id: number) {
    const checkBoard = await this.boardRepository.findOne({ where: { id, boardTitle : Not("") }});
    if (!checkBoard) {
      throw new NotFoundException('없는 Board Id입니다.');
    }
    const currentBoard = await this.boardRepository.findOne({ where: { id }, relations: { subCategory: { category: { user: true }}}});
    const user = {
      id: currentBoard.subCategory.category.user.id,
    };
    const processedBoard = {
      ...currentBoard,
      subCategory: {
        ...currentBoard.subCategory,
        category: {
          ...currentBoard.subCategory.category,
          user,
        },
      },
    }
    const prevBoard = await this.boardRepository.findOne({ where: { boardTitle: Not(''), id: LessThan(id), subCategory: { categorySubTitle: currentBoard.subCategory.categorySubTitle } }, relations: { subCategory: true }, order: { id: 'desc' } });
    const nextBoard = await this.boardRepository.findOne({ where: { boardTitle: Not(''), id: MoreThan(id), subCategory: { categorySubTitle: currentBoard.subCategory.categorySubTitle } }, relations: { subCategory: true }, order: { id: 'asc' } });
    return {
      currentBoard : processedBoard,
      prevBoard: prevBoard ?? {},
      nextBoard: nextBoard ?? {},
    };
  }

  async getAllBoards(page: number) {
    const [boards, total] = await this.boardRepository.findAndCount({ where: { boardTitle: Not('') }, relations: { subCategory: true }, order: { id: 'desc' }, take: this.TAKE, skip: (page - 1) * this.TAKE });
    return (
      {
        boards,
        last_page: Math.ceil(total / this.TAKE),
      } ?? {}
    );
  }
  async getBoardsForCategory(categoryTitle: string, page: number) {
    const [boards, total] = await this.boardRepository.findAndCount({ where: { boardTitle: Not(''), subCategory: { category: { categoryTitle } } }, relations: { subCategory: true }, order: { id: 'desc' }, take: this.TAKE, skip: (page - 1) * this.TAKE });
    return (
      {
        boards,
        last_page: Math.ceil(total / this.TAKE),
      } ?? {}
    );
  }

  async getBoardsForSubCategory(categorySubTitle: string, page: number) {
    const [boards, total] = await this.boardRepository.findAndCount({ where: { boardTitle: Not(''), subCategory: { categorySubTitle } }, relations: { subCategory: true }, order: { id: 'desc' }, take: this.TAKE, skip: (page - 1) * this.TAKE });
    return (
      {
        boards,
        last_page: Math.ceil(total / this.TAKE),
      } ?? {}
    );
  }

  async deleteBoard(id: number, user: User) {
    return this.boardRepository.deleteBoard(id, user);
  }
  async updateBoard(body, file: Express.Multer.File, user: User) {
    return this.boardRepository.updateBoard(body, file, user);
  }

  async getNewBoards() {
    const newBoard = await this.boardRepository.find({ where: { boardTitle: Not('') }, relations: { subCategory: { category: true } }, order: { createdAt: 'DESC' }, take: 6 });
    return newBoard ?? [];
  }
}
