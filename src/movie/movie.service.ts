import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository, SelectQueryBuilder } from 'typeorm'
import { addPagination } from '../common/helper/add-pagination'
import { Movie } from '../orm/entities/movie.entity'
import { MoviesFindInput } from './interfaces/movies-find.input'

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>
  ) {}

  private addSearchByTitle<Movie>(
    queryBuilder: SelectQueryBuilder<Movie>,
    searchTerm: string
  ): SelectQueryBuilder<Movie> {
    if (searchTerm && searchTerm.trim().length > 0) {
      queryBuilder.andWhere({ title: ILike(`%${searchTerm}%`) })
    }
    return queryBuilder
  }

  public async findManyAndCount(query: MoviesFindInput): Promise<[Movie[], number]> {
    const { page, limit, searchTerm } = query
    const pagination = { page, limit }
    const queryBuilder = this.movieRepository.createQueryBuilder('movie')
    addPagination(queryBuilder, pagination)
    this.addSearchByTitle(queryBuilder, searchTerm)

    return queryBuilder.getManyAndCount()
  }
}
