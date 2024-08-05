import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginationInput } from '../../common/input/pagination.input'

export class MoviesFindInput extends PaginationInput {
  @ApiProperty({
    example: 'Inception',
    required: false
  })
  @IsOptional()
  @IsString()
  searchTerm: string
}
