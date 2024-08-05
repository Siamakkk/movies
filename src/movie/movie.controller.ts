import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MoviesFindInput } from './interfaces/movies-find.input'
import { MoviesPaginatedOutput } from './interfaces/movies-paginated.output'
import { MovieService } from './movie.service'

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  public async getMovies(@Query() queryParams: MoviesFindInput): Promise<MoviesPaginatedOutput> {
    const [results, resultCount] = await this.movieService.findManyAndCount(queryParams)
    return {
      results,
      resultCount
    }
  }
}
