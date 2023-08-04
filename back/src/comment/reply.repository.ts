import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentCreateDto } from './dto/comment-create.dto';
import { BoardRepository } from 'src/board/board.repository';
import { User } from 'src/auth/user.entity';
import { Reply } from './reply.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class ReplyRepository extends Repository<Reply> {
  constructor(private dataSource: DataSource, private commentRepository : CommentRepository ) {
    super(Reply, dataSource.createEntityManager());
  }

  async createReplyComment(commentId : number, commentCreateDto : CommentCreateDto, user: User){
    const {userEmail, userName, id: userId} = user;
    const {comment : replyComment, isSecret} = commentCreateDto;
    const foundComment = await this.commentRepository.findOneBy({id : commentId});
    if(!foundComment){
      throw new  BadRequestException('해당 댓글을 찾을 수 없습니다.')
    }
    const newReplyComment = this.create({
      userEmail,
      userName,
      userId,
      replyComment,
      isSecret : isSecret ?? "false",
      comment : foundComment
    })
    await this.save(newReplyComment);
  }
  async deleteReplyComment(replyId : number, user: User){
    const comment = await this.findOneBy({id : replyId, comment : {board : { subCategory : { category : { user : { id : user.id}}}}}})
    if(!comment)throw new BadRequestException('삭제할 댓글이 없습니다.')
    await this.delete({id : replyId})
  }

}
