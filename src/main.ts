import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const appPort: number = 8000;

(async function () {
  const app = await NestFactory.create(AppModule);
  await app.listen(appPort);
})();

console.info(`server is running at http://localhost:${appPort}`);
