import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { SearchService } from "src/place/kakaoMapSearch/search.service";
import { SortType } from "src/place/kakaoMapSearch/search.dto";

import { CreateSpotInput } from "src/spot/dto/create-spot.input";
import { UpdateSpotInput } from "src/spot/dto/update-spot.input";
import { Spot, SpotDocument } from "src/spot/entities/spot.entity";
import { Place } from "src/place/place.entity";

@Injectable()
export class SpotService {
  constructor(
    @InjectModel(Spot.name) private spotModel: Model<SpotDocument>,
    private readonly searchService: SearchService
  ) {}

  async create(createSpotInput: CreateSpotInput): Promise<Spot> {
    let place:
      | Place
      | undefined = await this.searchService.getPlaceFromCacheById(
      createSpotInput.placeId
    );

    if (place === undefined) {
      const placeResult = await this.searchService.getIdenticalPlace(
        createSpotInput
      );

      if (placeResult === undefined) {
        // TODO: custom place 만들기
        // pass
      } else {
        place = placeResult;
      }
    }

    const location = { type: "Point", coordinates: [place.x, place.y] };
    const createSpotDto = {
      placeId: place.id,
      emojis: [createSpotInput.emoji],
      location,
      ...place,
    };
    console.log(createSpotDto);
    const createdSpot = new this.spotModel(createSpotDto);
    return createdSpot.save().catch((error) => {
      console.error(error);
      throw new HttpException(
        `cannot save a spot cause of ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    });
  }

  async update(_id: Types.ObjectId, emoji: string): Promise<Spot> {
    return this.spotModel
      .findOneAndUpdate({ _id }, { $push: { emojis: emoji } })
      .catch((err) => {
        console.error(err);
        throw new HttpException(
          `cannot update spot cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
    // const update = ;
    // return await this.spotModel.findOneAndUpdate(filter, update);
  }

  async findAll(): Promise<Spot[]> {
    return this.spotModel
      .find()
      .exec()
      .catch((err) => {
        console.error(err);
        throw new HttpException("bad request", HttpStatus.BAD_REQUEST);
      });
  }

  async findOneByPlaceId(placeId: string): Promise<Spot> {
    return this.spotModel.findOne({ placeId }).exec();
  }

  async remove(placeId: string) {
    return this.spotModel.remove({ placeId }).exec();
  }
}
