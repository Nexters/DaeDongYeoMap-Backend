import { Injectable } from "@nestjs/common";
import { CreateCourseImageInput } from "./course/dto/create-course-image.input";
import { KeywordSearchDto } from "./place/kakaoMapSearch/search.dto";
import { SearchService } from "./place/kakaoMapSearch/search.service";
import { Place } from "./place/place.entity";
import { StickerService } from "./sticker/sticker.service";
import { CreateSpotInput } from "./spot/dto/create-spot.input";
import { StickerInput } from "./sticker/dto/sticker.input";

@Injectable()
export class AppService {
  constructor(
    private readonly searchService: SearchService,
    private readonly stickerService: StickerService
  ) {}

  getHello(): string {
    return `Hello 데동여지도 🗺️❤️!`;
  }

  async createDummy(keyword: String): Promise<void> {
    const { places } = await this.searchService.searchByKeyword({
      query: keyword,
    } as KeywordSearchDto);

    this.createSpotDummy(places);
  }

  async createSpotDummy(places: Place[]) {
    const choices = [0, 30, 50, 70, 100];
    places.map(async (p) => {
      let createSpotInput = new CreateSpotInput();

      createSpotInput = {
        place_id: p.id,
        place_name: p.place_name,
        x: p.x,
        y: p.y,
        ...p,
      };
      let stickerInput = new StickerInput();
      stickerInput = {
        sticker_index: Math.floor(Math.random() * (11 - 0 + 1)) + 0,
        sweet_percent: choices[Math.floor(Math.random() * choices.length)],
      };

      const createStickerInput: any = {
        ...createSpotInput,
        ...stickerInput,
      };
      await this.stickerService.create(createStickerInput);
    });
  }
}
