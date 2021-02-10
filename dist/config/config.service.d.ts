import { ConfigService } from "@nestjs/config";
export declare class AppConfigService {
    private configService;
    constructor(configService: ConfigService);
    get(key: string): string;
    getAll(): any;
    getDB(): Promise<string>;
    getCacheDB(): Promise<string>;
}
