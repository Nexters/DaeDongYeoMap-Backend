import { registerAs } from "@nestjs/config";
import * as dotenv from "dotenv";

const configMap = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
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
  MAPBOX_API_HOST: process.env.MAPBOX_API_HOST,
  MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  MAPBOX_DIRECTION_PATH: process.env.MAPBOX_DIRECTION_PATH,
  MAPBOX_STATIC_IMAGE_PATH: process.env.MAPBOX_STATIC_IMAGE_PATH,
  IMG_SWEET_URL: process.env.IMG_SWEET_URL,
};

export default registerAs("app", () => {
  const level: string = process.env.NODE_ENV;
  if (level === "test") {
    return dotenv.config({ path: ".env.test" }).parsed;
  }
  if (level === "dev") {
    return dotenv.config({ path: ".env.dev" }).parsed;
  }
  return configMap;
});
