import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { Model, Types } from "mongoose";

import { Course, CourseDocument } from "src/course/entities/course.entity";
import { StickerService } from "src/sticker/sticker.service";
import { Spot } from "../spot/entities/spot.entity";

@Injectable()
export class CourseImageService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private configService: ConfigService,
    private readonly stickerService: StickerService
  ) {
    const mapboxHost: string = this.configService.get("app.MAPBOX_API_HOST");
    const mapboxToken: string = this.configService.get("app.MAPBOX_TOKEN");
    const directionPath: string = this.configService.get(
      "app.MAPBOX_DIRECTION_PATH"
    );
    const staticPath: string = this.configService.get(
      "app.MAPBOX_STATIC_IMAGE_PATH"
    );
  }

  async generate(stickers: Types.ObjectId[]): Promise<String> {
    let coords: [Number, Number][];
    const spots: Spot[] = await this.stickerService.getAllSpots(stickers);
    spots.forEach((s) => {
      console.log(s.location);
    });

    return "This have to defined";
  }

  async getPath(start: Spot, end: Spot) {}
}
