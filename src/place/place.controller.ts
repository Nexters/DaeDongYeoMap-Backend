import { Controller, Get, Param } from "@nestjs/common";
import { PlaceService } from "./place.service";

@Controller("place")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  getPlace(
    @Param("query") query: string,
    @Param("display") display: number,
    @Param("sort") sort: string
  ): object {
    return this.placeService.findAll(query, display, sort);
  }
}
