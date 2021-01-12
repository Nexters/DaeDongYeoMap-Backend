import * as dotenv from "dotenv";
import * as fs from "fs";

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getAll(): dotenv.DotenvParseOutput {
    // this is for debugging
    return this.envConfig;
  }
}
