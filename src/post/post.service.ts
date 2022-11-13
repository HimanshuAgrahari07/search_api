import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  async findAll() {
    return `This action returns all post`;
  }
}
