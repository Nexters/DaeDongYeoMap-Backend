import { Controller, Get, Query } from "@nestjs/common";
import { PlaceService } from "./naverSearch/search.service";
import { SearchDto } from "./naverSearch/search.dto";

@Controller("place")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get("/search")
  async getPlace(@Query() p: SearchDto): Promise<any> {
    // TODO: mongodb cache 추가
    const searchPlaces = await this.placeService.findAll(
      p.query,
      p.display,
      p.sort
    );

    // TODO: api wrap with graphql

    return searchPlaces.data;
  }
}
