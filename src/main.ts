import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });

  const configService = new ConfigService();

  app.enableCors();
  await app.listen(process.env.PORT || configService.get("NODE_PORT"));
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
