import {
  IsString,
  IsNumber,
  Length,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class PostJobDto {
  @IsNotEmpty()
  @IsString()
  companyId!: string;

  @IsNotEmpty()
  @Length(5, 50)
  @IsString()
  title!: string;

  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  position!: string;

  @IsNotEmpty()
  @Min(0)
  @Max(100000000)
  @IsNumber()
  reward!: number;

  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  tech!: string;

  @IsNotEmpty()
  @Length(2, 5000)
  @IsString()
  description!: string;
}
