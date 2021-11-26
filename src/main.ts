import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';
import { initSwagger } from './app.swagger';
import { Logger, ValidationPipe, Put, Delete } from '@nestjs/common';
//import {  methodOverride } from 'method-override';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger(); 
  
  initSwagger(app);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  //app.use(methodOverride('_method'));
  app.useGlobalPipes( //para segurity
    new ValidationPipe({
      whitelist: true,
    }),
  );
  
  const theme = 'uplon';
  hbs.registerPartials(join(__dirname, '..', theme, '/partials'));
  hbs.registerPartials(join(__dirname, '..', theme, '/components'));
  hbs.registerPartials(join(__dirname, '..', theme));

  await app.listen(3001, '0.0.0.0', async () => {
    logger.log('server in running', await app.getUrl());
  });
}
bootstrap();
