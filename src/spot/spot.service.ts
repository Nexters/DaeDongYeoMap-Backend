import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { SearchService } from "src/place/kakaoMapSearch/search.service";

import { CreateSpotInput } from "src/spot/dto/create-spot.input";
import { UpdateSpotInput } from "src/spot/dto/update-spot.input";
import { Spot, SpotDocument } from "src/spot/entities/spot.entity";

@Injectable()
export class SpotService {
  constructor(
    @InjectModel(Spot.name) private spotModel: Model<SpotDocument>,
    private readonly searchService: SearchService
  ) {}

  async create(createSpotInput: CreateSpotInput) {
    const place = await this.searchService.getPlaceFromCacheById(
      createSpotInput.id
    );

    console.log(place);
    place.emoji = createSpotInput.emoji;
    // TODO: cache miss ....

    const createdSpot = new this.spotModel(place);
    return createdSpot.save();
  }

  async update(spot: any, emoji: string): Promise<Spot> {
    spot.emojis.push(emoji);
    return await spot.save();
    // const update = { $push: { emojis: emoji } };
    // return await this.spotModel.findOneAndUpdate(filter, update);
  }

  async findAll(): Promise<Spot[]> {
    return this.spotModel.find().exec();
  }

  async findOne(id: string) {
    const spot = this.spotModel.findOne({ id: id }).exec();
    if (spot) {
      return spot;
    }
    return undefined;
  }

  async remove(id: string) {
    return this.spotModel.remove({ id: id }).exec();
  }
}
