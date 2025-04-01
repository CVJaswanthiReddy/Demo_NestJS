import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  async findAll(sort: 'asc' | 'desc' = 'desc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);
    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }
  async findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  async findOne(id: string) {
    const episode = this.episodes.find((episode) => String(episode.id) === id);
    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }
    return episode;
  }
  async create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);

    return newEpisode;
  }

  async update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    console.log('Existing Episodes:', this.episodes); //  Log all episodes
    console.log('Updating Episode ID:', id); // Log requested ID
    const index = this.episodes.findIndex(
      (episode) => String(episode.id) === id,
    );
    if (index == -1) {
      throw new NotFoundException(`Episode with ID: ${id} not found`);
    }
    if (updateEpisodeDto.publishedAt) {
      updateEpisodeDto.publishedAt = new Date(updateEpisodeDto.publishedAt);
    }
    //update
    this.episodes[index] = { ...this.episodes[index], ...updateEpisodeDto };
    return this.episodes[index];
  }

  async delete(id: String) {
    const index = this.episodes.findIndex(
      (episode) => String(episode.id) === id,
    );
    if (index == -1) {
      throw new NotFoundException(`Episode with ID: ${id} not found`);
    }

    const deletedEpisode = this.episodes[index]; //save for response
    this.episodes.splice(index, 1); //remove froma array
    return { message: `Episode with ID: ${id} deleted`, deletedEpisode };
  }
}
