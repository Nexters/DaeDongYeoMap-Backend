import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get(key: string): string {
    return this.configService.get(`app.${key}`);
  }
  getAll(): any {
    return this.configService.get("app");
  }

  getDB(): string {
    return this.get("NODE_ENV") === "dev"
      ? `mongodb://localhost:27017/mongo`
      : `mongodb://${this.get("MONGO_USER")}:${this.get(
          "MONGO_PWD"
        )}@${this.get("MONGO_IP")}:${this.get("MONGO_PORT")}/${this.get(
          "MONGO_DB_NAME"
        )}`;
  }

  getCacheDB(): string {
    return this.get("NODE_ENV") === "dev"
      ? `mongodb://localhost:27017/nodeCacheDb`
      : `mongodb://${this.get("MONGO_USER")}:${this.get(
          "MONGO_PWD"
        )}@${this.get("MONGO_IP")}:${this.get("MONGO_PORT")}/${this.get(
          "MONGO_CACHE_NAME"
        )}`;
  }
}
