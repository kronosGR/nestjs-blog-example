import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('{/:userId}') // optional
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
}
