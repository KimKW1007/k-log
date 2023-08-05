import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CommentCreateDto } from './dto/comment-create.dto';
import { User } from 'src/auth/user.entity';
import { ReplyRepository } from './reply.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    private replyRepository: ReplyRepository
  ) {}

  async sendMail(boardId : number, commentCreateDto : CommentCreateDto, user: User){
    return this.commentRepository.sendMail(boardId, commentCreateDto, user)
  }
  async createComment(boardId : number, commentCreateDto : CommentCreateDto, user: User){
    return this.commentRepository.createComment(boardId, commentCreateDto, user)
  }
  async createReplyComment(commentId : number, commentCreateDto : CommentCreateDto, user: User){
    return this.replyRepository.createReplyComment(commentId, commentCreateDto, user)
  }
  async getTargetBoardComment(boardId : number){
    return this.commentRepository.getTargetBoardComment(boardId)
  }
  async deleteComment(commentId : number, user: User){
    return this.commentRepository.deleteComment(commentId, user)
  }
  async deleteReplyComment(replyId : number, user: User){
    return this.replyRepository.deleteReplyComment(replyId, user)
  }
  

}
