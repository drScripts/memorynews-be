import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: "*",
    methods: "*",
    origin: "*",
  });


  const config = new DocumentBuilder()
    .setTitle('News API Documentation')
    .setDescription('The news API description')
    .setVersion('1.0')
    .addTag('news')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000, "0.0.0.0");
}
bootstrap();
