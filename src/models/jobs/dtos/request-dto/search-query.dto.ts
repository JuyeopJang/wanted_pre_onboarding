import { IsString, Length, Min } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  @Length(2)
  keyword: string;
}
