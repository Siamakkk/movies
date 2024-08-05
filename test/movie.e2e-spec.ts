import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { MovieModule } from '../src/movie/movie.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MovieModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/movie (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/movie').query({
      page: 1,
      limit: 10
    })

    expect(res.body.results).toBeInstanceOf(Array)
    expect(res.body.results.length).toBe(10)
    expect(res.body.resultCount).toBeGreaterThan(10)
  })

  it('/movie (GET) should return 400 error with invalid query', async () => {
    const res = await request(app.getHttpServer()).get('/movie').query({
      page: 1,
      limit: 'invalidLimit'
    })

    expect(res.status).toBe(400)
    expect(res.body.results).toBe(undefined)
  })

  it('/movie (GET) with searchTerm', async () => {
    const res = await request(app.getHttpServer()).get('/movie').query({
      page: 1,
      limit: 10,
      searchTerm: 'caribbean'
    })

    expect(res.body.results).toBeInstanceOf(Array)
    expect(res.body.results.length).toBeGreaterThan(1)
  })
})
