import { IsString, IsNumber } from 'class-validator';

export class PostJobDto {
  @IsString()
  companyId: string;

  @IsString()
  position: string;

  @IsNumber()
  reward: number;

  @IsString()
  tech: string;

  @IsString()
  description: string;
}
