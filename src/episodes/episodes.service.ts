import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EpisodesService {
  constructor(@InjectModel('Episode') private episodeModel: Model<Episode>) {}

  //find all episodes
  async findAll() {
    return this.episodeModel.find().exec();
  }

  //find by id
  async findOne(id: string) {
    const episode = await this.episodeModel.findById(id).exec();
    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }
    return episode;
  }

  //create an episode
  async create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = new this.episodeModel(createEpisodeDto);
    return newEpisode.save();
  }

  //update an episode
  async update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    const updatedEpisode = await this.episodeModel
      .findByIdAndUpdate(id, updateEpisodeDto, { new: true })
      .exec();

    if (!updatedEpisode) {
      throw new NotFoundException(`Episode with ${id} not found`);
    }
    return updatedEpisode;
  }

  //delete an episode
  async delete(id: String) {
    const deletedEpisode = await this.episodeModel.findByIdAndDelete(id).exec();
    if (!deletedEpisode) {
      throw new NotFoundException(`Episode with ${id} not found`);
    }
    return deletedEpisode;
  }
}
