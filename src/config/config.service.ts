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
    return this.get("NODE_ENV") === "dev"
      ? `mongodb://localhost:27017/mongo`
      : `mongodb://${this.configService.get(
          "app.MONGO_USER"
        )}:${this.configService.get("app.MONGO_PWD")}@${this.configService.get(
          "app.MONGO_IP"
        )}:${this.configService.get("app.MONGO_PORT")}/${this.configService.get(
          "app.MONGO_DB_NAME"
        )}`;
  }

  async getCacheDB(): Promise<string> {
    return this.get("NODE_ENV") === "dev"
      ? `mongodb://localhost:27017/nodeCacheDb`
      : `mongodb://${this.configService.get(
          "app.MONGO_USER"
        )}:${this.configService.get("app.MONGO_PWD")}@${this.configService.get(
          "app.MONGO_IP"
        )}:${this.configService.get("app.MONGO_PORT")}/${this.configService.get(
          "app.MONGO_CACHE_NAME"
        )}`;
  }
}
