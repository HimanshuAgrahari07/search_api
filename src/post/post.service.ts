import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(query: Partial<Post>) {
    //TODO: Need to implement this
  }
}
