// https://github.com/dantman/nestjs-user-cache-test/blob/master/src/user-cache/user-cache.service.spec.ts
import { CacheModule, CACHE_MANAGER } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";

import { PlaceModule } from "../place/place.module";
import { Sticker, StickerSchema } from "../sticker/entities/sticker.entity";
import { Spot, SpotSchema } from "../spot/entities/spot.entity";
import { SpotService } from "../spot/spot.service";
import { StickerService } from "./sticker.service";

import DbModule, {
  closeMongoConnection,
} from "../../test/utils/db-test.module";

describe("StickerService", () => {
  let service: StickerService;
  let connection: Connection;
  let cacheManager: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PlaceModule,
        DbModule({
          connectionName: (new Date().getTime() * Math.random()).toString(16),
        }),
        MongooseModule.forFeature([
          { name: Sticker.name, schema: StickerSchema },
        ]),
        MongooseModule.forFeature([{ name: Spot.name, schema: SpotSchema }]),
      ],
      providers: [SpotService, StickerService],
    }).compile();

    service = module.get<StickerService>(StickerService);
    connection = await module.get(getConnectionToken());
    cacheManager = module.get(CACHE_MANAGER);
  });
  afterEach(async () => {
    await connection.close();
    await closeMongoConnection();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("mongodb connection should be defined", () => {
    expect(connection).toBeDefined();
  });

  it("mongodb cache manager should be available", () => {
    expect(cacheManager).toBeDefined();
  });

  describe("getAll", () => {
    it("", () => {});
  });
});
