import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';
import { AllExceptionsFilter } from './shared/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  const appConfig: AppConfigService = app.get('AppConfigService');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: errors => new BadRequestException(errors),
    }),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(process.env.PORT || 8080, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
