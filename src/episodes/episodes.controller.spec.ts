import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    create: jest.fn((dto) => {
      return {
        id: 1234,
        ...dto,
      };
    }),

    findAll: jest.fn(() => [
      { id: '1', name: 'Episode 1', featured: false, publishedAt: new Date() },
    ]),

    findOne: jest.fn((id: string) => {
      if (id === '1')
        return {
          id: '1',
          name: 'Episode 1',
          featured: false,
          publishedAt: new Date(),
        };
      throw new NotFoundException(`Episode withe ID ${id} not found`);
    }),

    update: jest.fn((id: string, dto: UpdateEpisodeDto) => ({
      id,
      ...dto,
    })),

    delete: jest.fn((id: string) => {
      if (id === '1') return { message: `Episode ${id} deleted successfully` };
      throw new NotFoundException(`Episode with ${id} not found`);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    })

      .compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an episode', async () => {
    const episodeDto = {
      name: 'Lovely Runner',
      featured: false,
      publishedAt: new Date('2025-03-31T00:00:00.000Z'),
    };
    const result = await controller.create(episodeDto);
    expect(result).toEqual({
      id: 1234,
      ...episodeDto,
    });
    expect(mockEpisodesService.create).toHaveBeenCalledWith(episodeDto);
  });

  it('should fetch all episodes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      {
        id: '1',
        name: 'Episode 1',
        featured: false,
        publishedAt: expect.any(Date),
      },
    ]);
    expect(mockEpisodesService.findAll).toHaveBeenCalled();
  });

  it('should fetch by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({
      id: '1',
      name: 'Episode 1',
      featured: false,
      publishedAt: expect.any(Date),
    });
    expect(mockEpisodesService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update by id', async () => {
    const updateDto: UpdateEpisodeDto = {
      name: 'updated name',
      featured: true,
      publishedAt: new Date('2025-04-31T00:00:00.000Z'),
    };
    const result = await controller.update('1', updateDto);
    expect(result).toEqual({ id: '1', ...updateDto });
    expect(mockEpisodesService.update).toHaveBeenCalledWith('1', updateDto);
  });

  it('should delete by id', async () => {
    const result = await controller.delete('1');
    expect(result).toEqual({
      message: 'Episode 1 deleted successfully',
    });
    expect(mockEpisodesService.delete).toHaveBeenCalledWith('1');
  });
});
