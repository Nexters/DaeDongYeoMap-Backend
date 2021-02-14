import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {
    console.log(this.configService);
  }

  get(key: string): string {
    return this.configService.get(`app.${key}`);
  }
  getAll(): any {
    return this.configService.get("app");
  }

  async getDB(): Promise<string> {
    const level: string = this.get("NODE_ENV");
    console.log(`db level: ${level}`);
    if (level === "test") {
      return `mongodb://localhost:27017/mongo-test`;
    }

    if (level === "dev") {
      return `mongodb://localhost:27017/mongo`;
    }

    if (level === "sandbox") {
      return `mongodb://${this.configService.get(
        "app.MONGO_USER"
      )}:${this.configService.get("app.MONGO_PWD")}@${this.configService.get(
        "app.MONGO_IP"
      )}:${this.configService.get("app.MONGO_PORT")}/${this.configService.get(
        "app.MONGO_DB_NAME"
      )}`;
    }

    if (level === "production") {
      return `mongodb+srv://${this.configService.get(
        "app.MONGO_USER"
      )}:${this.configService.get("app.MONGO_PWD")}@${this.configService.get(
        "app.MONGO_IP"
      )}/${this.configService.get(
        "app.MONGO_DB_NAME"
      )}?retryWrites=true&w=majority`;
    }
  }
}
