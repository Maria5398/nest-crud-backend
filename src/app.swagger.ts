import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('MyBlog API')
        .addBearerAuth()
        .setDescription(
            'Esta es  una Api creada con Nodejs con un crud basico',
        )
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, document);
};