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
      createSpotInput.id
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
      id: createSpotInput.id,
      emojis: [createSpotInput.emoji],
      location,
      ...place,
    };
    const createdSpot = new this.spotModel(createSpotDto);
    return createdSpot.save().catch((error) => {
      console.error(error);
      throw new HttpException(
        `cannot save a spot cause of ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    });
  }

  async update(spot: any, emoji: string): Promise<Spot> {
    spot.emojis.push(emoji);
    return spot.save();
    // const update = { $push: { emojis: emoji } };
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

  async findOneByKakaoId(kakaoId: string) {
    return this.spotModel
      .findOne({ id: kakaoId })
      .exec()
      .then((response) => {
        if (!response) {
          throw new Error("There is no spots that matched by kakao id.");
        }
      })
      .catch((err) => {
        console.error(err);
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    return this.spotModel.remove({ id: id }).exec();
  }

  async getByKeyword(keyword: string): Promise<Spot[]> {
    /*
    mongodb 한국어 쿼리 참고자료
    - https://ip99202.github.io/posts/nodejs,-mongodb-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5/
    - https://github.com/Tekiter/EZSET/blob/master/backend/src/api/v1/simple.route.js
    */
    return this.spotModel
      .find({ place_name: new RegExp(keyword) })
      .exec()
      .catch((err) => {
        console.error(err);
        throw new HttpException(
          "There is no spots that matched by keyword.",
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async removeAll() {
    // remove all spots for cleanup
  }
}
