import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });
  const appConfig: AppConfigService = app.get("AppConfigService");
  app.enableCors();

  await app.listen(appConfig.get("NODE_PORT"));
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
