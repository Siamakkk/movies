import { IsOptional, IsString } from 'class-validator'
import { PaginationInput } from '../../common/input/pagination.input'

export class MoviesFindInput extends PaginationInput {
  @IsOptional()
  @IsString()
  searchTerm: string
}
