import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClassDto {
  @ApiPropertyOptional({ example: 'LP1' })
  topic?: string;

  @ApiPropertyOptional({ example: 2024 })
  year?: number;

  @ApiPropertyOptional({ example: 1 })
  semester?: number;
}
