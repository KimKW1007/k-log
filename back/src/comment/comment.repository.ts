import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentCreateDto } from './dto/comment-create.dto';
import { BoardRepository } from 'src/board/board.repository';
import { User } from 'src/auth/user.entity';
import { FileRepository } from 'src/file/file.repository';
import { UserRepository } from 'src/auth/user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import * as config from "config"
const mailConfig = config.get("nodeMail");
@Injectable()
export class CommentRepository extends Repository<Comment> {
    constructor(private dataSource: DataSource, private boardRepository : BoardRepository, private fileRepository : FileRepository,  private readonly mailerService: MailerService,) {
    super(Comment, dataSource.createEntityManager());
  }
  
  async createComment(boardId : number, commentCreateDto : CommentCreateDto, user: User){
    const {userEmail, userName, id} = user;
    const {comment, isSecret} = commentCreateDto;
    const authorImage = await this.fileRepository.findOneBy({ user: { id: user.id } });
    const foundBoard = await this.boardRepository.findOneBy({id : boardId});
    if(!foundBoard){
      throw new  BadRequestException('게시물을 찾을 수 없습니다.')
    }
    const newComment = this.create({
      authorEmail : userEmail,
      authorId : id,
      authorName : userName,
      isSecret : isSecret ?? "false",
      authorImage : authorImage?.imageUrl ??  '',
      comment,
      board : foundBoard
    })
    
    await this.save(newComment);
  }

  async sendMail(boardId : number, commentCreateDto : CommentCreateDto, user: User){
    const {userEmail, userName, id} = user;
    const {comment, isSecret} = commentCreateDto;
    const foundBoard = await this.boardRepository.findOneBy({id : boardId});
    if(user.id === 1){
      return
    }
    await this.mailerService
    .sendMail({
      from: `"K : log" <${process.env.NODEMAIL_MAIL_ID || mailConfig.mailId}>`,
      to: process.env.NODEMAIL_MAIL_ID || mailConfig.mailId,
      subject: `K : Log : ${userName}님의 댓글 - ${foundBoard.boardTitle}`,
      html: `<div style='width: 100%; max-width: 700px; margin: 0 auto; min-height: 500px; background :#23262d; color :#fff; padding : 30px 60px; box-sizing: border-box;'>
      <h2 style='font-size: 40px; text-align:center;'>K : Log</h2>
      <div style="text-align:center; margin-bottom :50px;">
        <a href="http://localhost:3000/${boardId}" style="color: #fff; display:inline-block; ">게시물 바로가기</a>
      </div>
      <div style="width: 100%; padding : 20px 30px; min-height: 300px; background :rgba(128,128,128,0.3); box-sizing: border-box; text-align:center;">
        <p style="text-align: left;">${userName} 님</p>
        ${comment}
      </div>
      </div>`
    }).catch(e =>{
      throw new Error('메일 전송 중 오류 발생')
    })
  }
  async getTargetBoardComment(boardId : number){
    const comments = await this.find({where : {board: {id : boardId}}, order: {createdAt : "DESC", replies : {createdAt : "ASC"}}})
    const foundUser = await this.boardRepository.findOne({where : {id : boardId} ,relations:{subCategory : {category : {user : true}}}})
    const writerId = foundUser.subCategory.category.user.id

    return {comments, writerId} ?? {}
  }
  async deleteComment(commentId : number, user: User){
    let comment;
    const checkAuthor = await this.findOne({where :{id : commentId} , relations :{board : {subCategory : {category : {user :true}}}}})
    const writerId = checkAuthor.board.subCategory.category.user.id
    if(user.isAdmin){
      comment = await this.findOneBy({id : commentId})
    }else{
      comment = await this.findOneBy({id : commentId, authorId : user.id})
    }
    if(!comment)throw new BadRequestException('삭제할 댓글이 없습니다.')
    if(comment.replies.length > 0)throw new BadRequestException('대댓글로 인해 삭제요청을 거부합니다.')
    await this.delete({id : commentId})
  }
}
