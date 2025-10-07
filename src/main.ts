import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Abilita validazione globale (DTO con class-validator)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,             // accetta solo campi previsti nei DTO
    forbidNonWhitelisted: true,  // rifiuta extra fields
    transform: true,             // converte automaticamente tipi (string -> number)
  }));

  // Abilita CORS (per il frontend Next.js)
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}`);
}
bootstrap();
