import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { CreateSpotInput } from "./dto/create-spot.input";
import { UpdateSpotInput } from "./dto/update-spot.input";
import { Spot, SpotDocument } from "./entities/spot.entity";

@Injectable()
export class SpotService {
  constructor(@InjectModel(Spot.name) private spotModel: Model<SpotDocument>) {}

  async create(createSpotInput: CreateSpotInput) {
    // TODO: cache find
    const createdSpot = new this.spotModel(createSpotInput);
    return createdSpot.save();
  }

  async update(id: string, updateSpotInput: UpdateSpotInput) {
    return `This action updates a #${id} spot`;
  }

  async findAll(): Promise<Spot[]> {
    return this.spotModel.find().exec();
  }

  async findOne(id: number) {
    return `This action returns a #${id} spot`;
  }

  async remove(id: number) {
    return `This action removes a #${id} spot`;
  }
}
