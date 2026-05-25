import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateExperimentDto {
  @IsString()
  key: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
