import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueryHelperService } from './database/query-helper/query-helper.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule],
  controllers: [AppController],
  providers: [AppService, QueryHelperService],
})
export class AppModule {}
