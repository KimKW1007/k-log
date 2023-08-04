import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentCreateDto } from './dto/comment-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}


  @Post('/create/:boardId')
  @UseGuards(AuthGuard())
  createComment(@Param('boardId', ParseIntPipe) boardId : number, @Body() commentCreateDto : CommentCreateDto, @GetUser() user: User){
    return this.commentService.createComment(boardId, commentCreateDto, user)
  }
  @Post('/createReply/:commentId')
  @UseGuards(AuthGuard())
  createReplyComment(@Param('commentId', ParseIntPipe) commentId : number, @Body() commentCreateDto : CommentCreateDto, @GetUser() user: User){
    return this.commentService.createReplyComment(commentId, commentCreateDto, user)
  }

  @Get("/getTargetBoardComment/:boardId")
  getTargetBoardComment(@Param('boardId', ParseIntPipe) boardId : number){
    return this.commentService.getTargetBoardComment(boardId)
  }

  @Delete('/deleteComment/:commentId')
  @UseGuards(AuthGuard())
  deleteComment(@Param('commentId', ParseIntPipe)commentId : number, @GetUser() user: User){
    return this.commentService.deleteComment(commentId, user)
  }
  @Delete('/deleteReply/:replyId')
  @UseGuards(AuthGuard())
  deleteReplyComment(@Param('replyId', ParseIntPipe)replyId : number, @GetUser() user: User){
    return this.commentService.deleteReplyComment(replyId, user)
  }

}
