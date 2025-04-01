import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';

import { TopicsModule } from './topics/topics.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/demoproject'),
    EpisodesModule,
    TopicsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
