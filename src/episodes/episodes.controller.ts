import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodeService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    console.log(sort);
    return this.episodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.episodeService.findOne(id);
  }
  @Post()
  create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    console.log(input);
    return this.episodeService.create(input);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) input: UpdateEpisodeDto,
  ) {
    console.log(input);
    return this.episodeService.update(id, input);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.episodeService.delete(id);
  }
}
