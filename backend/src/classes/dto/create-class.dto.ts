import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: 'LP1' })
  topic: string;

  @ApiProperty({ example: 2024 })
  year: number;

  @ApiProperty({ example: 1 })
  semester: number;
}
