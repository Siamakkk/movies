import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, Max, Min } from 'class-validator'

export class PaginationInput {
  @ApiProperty({
    example: 1,
    required: false
  })
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number

  @ApiProperty({
    example: 10,
    required: false
  })
  @Min(0)
  @Max(250)
  @IsOptional()
  @Type(() => Number)
  limit?: number
}
