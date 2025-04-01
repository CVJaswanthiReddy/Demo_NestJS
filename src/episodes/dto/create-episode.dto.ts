import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';
export class CreateEpisodeDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsDate()
  @Type(() => Date)
  publishedAt: Date;
}
