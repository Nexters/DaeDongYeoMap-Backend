import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { getConnectionToken } from "@nestjs/mongoose";
import * as request from "supertest";
import { Connection } from "mongoose";

import { AppModule } from "./../src/app.module";
import { createSticker } from "./constants";

// mongoose e2e test with rollout https://dev.to/webeleon/unit-testing-nestjs-with-mongo-in-memory-54gd
// https://github.com/nestjs/mongoose/issues/167
describe("Sticker (e2e)", () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = await moduleFixture.get(getConnectionToken());

    await app.init();
  });

  afterEach(async () => {
    await connection.dropCollection("spots");
    await connection.dropCollection("stickers");
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  it("/graphql (Mutation) createSticker", () => {
    return request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: createSticker.input,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(createSticker.output);
      });
  });
});
