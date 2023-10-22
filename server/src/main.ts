import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const port = process.env.PORT ?? 3001
  const app = await NestFactory.create(AppModule, {
    bodyParser: true, cors: true
  });

  // Crie uma instância express
  const expressApp = express();

  // Aumente o limite de tamanho de carga 
  expressApp.use(bodyParser.json({ limit: '100gb' }));
  expressApp.use(bodyParser.urlencoded({ limit: '100gb', extended: true }));

  // Configure o express como middleware para o aplicativo Nest.js
  app.use(expressApp);

  const options = new DocumentBuilder()
    .setTitle('API do Telegram')
    .setDescription('API para enviar mensagens com imagens para o Telegram')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
