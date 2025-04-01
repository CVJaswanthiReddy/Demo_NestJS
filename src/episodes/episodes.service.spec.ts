import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesController } from './episodes.controller';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

describe('EpisodesService', () => {
  let service: EpisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpisodesService],
    }).compile();

    service = module.get<EpisodesService>(EpisodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an episode', async () => {
    const episodeDto: CreateEpisodeDto = {
      name: 'Episode 1',
      featured: true,
      publishedAt: new Date('2025-04-01T00:00:00.000Z'),
    };
    const result = await service.create(episodeDto);
    expect(result).toEqual({
      id: expect.any(String),
      ...episodeDto,
    });
    expect(service['episodes'].length).toBe(1);
  });

  it('should return all epsiodes in descending order by default', async () => {
    await service.create({
      name: 'Episode A',
      featured: false,
      publishedAt: new Date(),
    });
    await service.create({
      name: 'Episode B',
      featured: false,
      publishedAt: new Date(),
    });
    const result = await service.findAll();
    expect(result[0].name).toBe('Episode B');
    expect(result[1].name).toBe('Episode A');
  });

  it('should return all episodes in ascending order when specified', async () => {
    await service.create({
      name: 'Episode C',
      featured: false,
      publishedAt: new Date(),
    });
    await service.create({
      name: 'Episode D',
      featured: false,
      publishedAt: new Date(),
    });
    const result = await service.findAll();
    expect(result[0].name).toBe('Episode C');
    expect(result[1].name).toBe('Episode D');
  });

  it('should return an episode by id', async () => {
    const episode = await service.create({
      name: 'Episode 2',
      featured: false,
      publishedAt: new Date(),
    });
    const found = await service.findOne(episode.id);
    expect(found).toEqual(episode);
  });
  it('should throw NotFoundException if id is not found', async () => {
    await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
  });

  it('should update an epsiode', async () => {
    const episode = await service.create({
      name: 'Episode 3',
      featured: false,
      publishedAt: new Date(),
    });
    const updateDto: UpdateEpisodeDto = {
      name: 'updated episode',
      featured: false,
      publishedAt: new Date(),
    };
    const updated = await service.update(episode.id, updateDto);
    expect(updated.name).toBe('updated episode');
  });

  it('show throw NotFoundException when updating non-exisiting episode', async () => {
    await expect(
      service.update('99', {
        name: 'new name',
        featured: true,
        publishedAt: new Date(),
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete an episode', async () => {
    const episode = await service.create({
      name: 'Episode 20',
      featured: true,
      publishedAt: new Date(),
    });

    await service.delete(episode.id);
    await expect(service.findOne(episode.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw NotFoundException when deleting non-exisiting episode', async () => {
    await expect(service.delete('99')).rejects.toThrow(NotFoundException);
  });
});
