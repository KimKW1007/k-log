import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentCreateDto } from './dto/comment-create.dto';
import { BoardRepository } from 'src/board/board.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource, private boardRepository : BoardRepository ) {
    super(Comment, dataSource.createEntityManager());
  }
  
  async createComment(boardId : number, commentCreateDto : CommentCreateDto, user: User){
    const {userEmail, userName, id: userId} = user;
    const {comment, isSecret} = commentCreateDto;
    const foundBoard = await this.boardRepository.findOneBy({id : boardId});
    if(!foundBoard){
      throw new  BadRequestException('게시물을 찾을 수 없습니다.')
    }
    const newComment = this.create({
      userEmail,
      userId,
      userName,
      isSecret : isSecret ?? "false",
      comment,
      board : foundBoard
    })
    await this.save(newComment);
  }

  async getTargetBoardComment(boardId : number){
    const comments = await this.find({where : {board: {id : boardId}}, order: {createdAt : "DESC"}})
    return comments ?? []
  }
  async deleteComment(commentId : number, user: User){
    const comment = await this.findOneBy({id : commentId, board : { subCategory : { category : { user : { id : user.id}}}}})
    if(!comment)throw new BadRequestException('삭제할 댓글이 없습니다.')
    if(comment.replies.length > 0)throw new BadRequestException('대댓글로 인해 삭제요청을 거부합니다.')
    await this.delete({id : commentId})
  }
}
