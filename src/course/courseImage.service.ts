import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { Model, Types } from "mongoose";
import Axios from "axios";
import urlencode from "urlencode";

import { Course, CourseDocument } from "src/course/entities/course.entity";
import { StickerService } from "src/sticker/sticker.service";
import { Spot } from "../spot/entities/spot.entity";

@Injectable()
export class CourseImageService {
  mapboxToken: string;
  mapboxImageUrl: string;
  mapboxDirectionUrl: string;
  sweetImgUrl: string;

  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private configService: ConfigService,
    private readonly stickerService: StickerService
  ) {
    const mapboxHost = this.configService.get("app.MAPBOX_API_HOST");
    const mapboxImagePath = this.configService.get(
      "app.MAPBOX_STATIC_IMAGE_PATH"
    );
    const mapboxDirPath = this.configService.get("app.MAPBOX_DIRECTION_PATH");
    this.mapboxToken = this.configService.get("app.MAPBOX_TOKEN");
    this.mapboxImageUrl = `${mapboxHost}/${mapboxImagePath}`;
    this.mapboxDirectionUrl = `${mapboxHost}/${mapboxDirPath}`;
    this.sweetImgUrl = this.configService.get("app.IMG_SWEET_URL");
  }

  async generate(stickers: Types.ObjectId[]): Promise<String> {
    // dark-v10, light-v10, streets-v11
    const theme: String = "dark-v10";
    const mapSize: String = "700x700";
    const autoScale: String = "auto"; // true

    const spots: Spot[] = await this.stickerService.getAllSpots(stickers);
    const coords: [Number, Number][] = spots.map(
      (s) => s.location["coordinates"]
    );

    const stickerPath: String = this.genStickerPath(coords);

    const path: String = await this.genPolyline(coords);

    const imageUrl: String = `${this.mapboxImageUrl}/${theme}/static/${path},${stickerPath}/${autoScale}/${mapSize}?access_token=${this.mapboxToken}`;
    return imageUrl;
  }

  genStickerPath(coords: [Number, Number][]): string {
    const prefix = `url-${this.sweetImgUrl}`;
    const url = coords.map((coord) => `${prefix}(${coord})`).join(";");
    return urlencode(url);
  }

  async genPolyline(coords: [Number, Number][]): Promise<String> {
    const polyline: String = await this.genPolyline(coords);
    const path: String = `path-4%2Bff512f(${polyline})`;
    return path;
  }

  async getPolyline(coords: [Number, Number][]): Promise<String> {
    const coordsPath = urlencode(coords.map((coord, _) => coord.join(",")));
    const pathUrl: string = `${this.mapboxDirectionUrl}/${coordsPath}`;
    const params = {
      alternatives: true,
      geometries: "polyline",
      steps: true,
      access_token: this.mapboxToken,
    };

    return Axios.get(pathUrl, {
      params,
    })
      .then((response) => response["routes"][0]["geometry"])
      .catch((err) => {
        console.error(err.response);
        throw new HttpException(
          `cannot get path cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }
}
