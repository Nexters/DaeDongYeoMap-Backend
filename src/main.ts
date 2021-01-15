import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });

  const configService = new ConfigService(".env");

  app.enableCors();
  // app.setGlobalPrefix(configService.get("NODE_ENV"));

  await app.listen(configService.get("NODE_PORT"));
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
