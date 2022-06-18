import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class JobListDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  limit: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  offset: number;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  keyword?: string;
}
