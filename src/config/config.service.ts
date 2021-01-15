import * as dotenv from "dotenv";
import * as fs from "fs";

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    if (process.env.NODE_ENV === "prod") {
      this.envConfig = {
        NODE_ENV: process.env.NODE_ENV,
        NODE_PORT: process.env.NODE_PORT,
        KAKAO_DEV_HOST: process.env.KAKAO_DEV_HOST,
        KAKAO_DEV_REST_API_KEY: process.env.KAKAO_DEV_REST_API_KEY,
        KAKAO_DEV_JDK: process.env.KAKAO_DEV_JDK,
        KAKAO_API_MAP_HOST: process.env.KAKAO_API_MAP_HOST,
        KAKAO_API_SEARCH: process.env.KAKAO_API_SEARCH,
        MONGO_IP: process.env.MONGO_IP,
        MONGO_PORT: process.env.MONGO_PORT,
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PWD: process.env.MONGO_PWD,
        MONGO_DB_NAME: process.env.MONGO_DB_NAME,
        MONGO_CACHE_NAME: process.env.MONGO_CACHE_NAME,
      };
    } else {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getAll(): dotenv.DotenvParseOutput {
    // this is for debugging
    return this.envConfig;
  }
}
