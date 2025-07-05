import { IsOptional, IsString } from 'class-validator';

export class QueryPaginationDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}
