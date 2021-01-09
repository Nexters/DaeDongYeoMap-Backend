import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const appPort: number = 8000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(appPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
