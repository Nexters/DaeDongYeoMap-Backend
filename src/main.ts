import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });

  app.enableCors();
  await app.listen(process.env.PORT || "8000");
  // await app.listen(process.env.PORT || configService.get("NODE_PORT"));
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
