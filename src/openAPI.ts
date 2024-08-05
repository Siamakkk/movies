import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('OpenAPI Specification')
    .setDescription('The API description of Movie')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)
}
