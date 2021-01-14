import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { SearchService } from "src/place/kakaoMapSearch/search.service";
import { CreateSpotInput } from "./dto/create-spot.input";
import { UpdateSpotInput } from "./dto/update-spot.input";
import { Spot, SpotDocument } from "./entities/spot.entity";

@Injectable()
export class SpotService {
  constructor(
    private readonly searchService: SearchService,
    @InjectModel(Spot.name) private spotModel: Model<SpotDocument>
  ) {}

  async create(createSpotInput: CreateSpotInput) {
    // TODO: cache find
    const createdSpot = new this.spotModel(createSpotInput);
    return createdSpot.save();
  }

  update(id: number, updateSpotInput: UpdateSpotInput) {
    return `This action updates a #${id} spot`;
  }

  findAll() {
    return `This action returns all spot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spot`;
  }

  remove(id: number) {
    return `This action removes a #${id} spot`;
  }
}
