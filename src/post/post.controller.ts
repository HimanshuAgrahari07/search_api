import { Controller, Get, Query } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(@Query() query: Partial<Post>) {
    // TODO: Call service
  }
}
