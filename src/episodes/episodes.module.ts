import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesService } from './episodes.service';
import { Episode, EpisodeSchema } from './episode.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Episode', schema: EpisodeSchema }]),
    ConfigModule,
  ],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
