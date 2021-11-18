import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();  

  initSwagger(app);

  app.useGlobalPipes( //para segurity
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000, '0.0.0.0', async () => {
    logger.log('server in running', await app.getUrl());
  });
  
}
bootstrap();
  