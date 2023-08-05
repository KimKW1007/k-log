import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentCreateDto } from './dto/comment-create.dto';
import { BoardRepository } from 'src/board/board.repository';
import { User } from 'src/auth/user.entity';
import { Reply } from './reply.entity';
import { CommentRepository } from './comment.repository';
import { FileRepository } from 'src/file/file.repository';

@Injectable()
export class ReplyRepository extends Repository<Reply> {
  constructor(private dataSource: DataSource, private commentRepository : CommentRepository, private fileRepository : FileRepository ) {
    super(Reply, dataSource.createEntityManager());
  }

  async createReplyComment(commentId : number, commentCreateDto : CommentCreateDto, user: User){
    const {userEmail, userName, id} = user;
    const {comment, isSecret} = commentCreateDto;
    const authorImage = await this.fileRepository.findOneBy({ user: { id: user.id } });
    const foundComment = await this.commentRepository.findOneBy({id : commentId});
    if(!foundComment){
      throw new  BadRequestException('해당 댓글을 찾을 수 없습니다.')
    }
    const newReplyComment = this.create({
      authorEmail: userEmail,
      authorName : userName,
      authorId : id,
      comment,
      authorImage : authorImage?.imageUrl ??  '',
      isSecret : isSecret ?? "false",
      connectedComment : foundComment
    })
    await this.save(newReplyComment);
  }
  async deleteReplyComment(replyId : number, user: User){
    let comment;
    const checkAuthor = await this.findOne({where :{id : replyId} , relations : { connectedComment : {board : {subCategory : {category : {user :true}}}}}})
    const writerId = checkAuthor.connectedComment.board.subCategory.category.user.id
    if(user.id === 1 || comment.authorId === writerId){
      comment = await this.findOneBy({id : replyId})
    }else{
      comment = await this.findOneBy({id : replyId, authorId : user.id})
    }
    if(!comment)throw new BadRequestException('삭제할 댓글이 없습니다.')
    await this.delete({id : replyId})
  }

}
