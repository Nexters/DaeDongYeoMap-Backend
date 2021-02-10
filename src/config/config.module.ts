import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import configuration from "./configuration";
import { AppConfigService } from "./config.service";

const configModuleOptions =
  process.env.NODE_ENV === "prod"
    ? { isGlobal: true, ignoreEnvFile: true }
    : { isGlobal: true, load: [configuration] };

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
