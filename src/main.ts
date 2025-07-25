import * as dotenv from 'dotenv';

// Load environment variables from .env file - must be first!
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //seeding data:
  //const seedService = app.get(SeedService);
  //await seedService.seed();

  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
