import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('{/:userId}') // optional
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log('createPostDto', createPostDto);
  }

  @ApiOperation({
    summary: 'Update a post',
  })
  @ApiResponse({
    status: 20,
    description: 'The record has been successfully updated.',
  })
  @Patch()
  public updatePost(@Body() patchBodyDto: PatchPostDto) {
    console.log('patchBodyDto', patchBodyDto);
  }
}
