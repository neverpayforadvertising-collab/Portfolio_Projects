import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  // enable CORS for frontend with credentials support
  const origin = config.get<string>('CORS_ORIGIN') || 'http://localhost:5173';
  app.enableCors({ origin, credentials: true });
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // initialize passport
  const passport = await import('passport');
  app.use(passport.initialize());

  const port = config.get<number>('PORT') ?? 3000;
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}

bootstrap();
