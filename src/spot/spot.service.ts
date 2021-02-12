import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { SearchService } from "../place/kakaoMapSearch/search.service";

import { CreateSpotInput } from "../spot/dto/create-spot.input";
import { SearchSpotDto } from "../spot/dto/search-spot.dto";
import { Spot, SpotDocument } from "../spot/entities/spot.entity";
import { Place } from "../place/place.entity";
import { Sticker } from "../sticker/entities/sticker.entity";

@Injectable()
export class SpotService {
  constructor(
    @InjectModel(Spot.name) private spotModel: Model<SpotDocument>,
    private readonly searchService: SearchService
  ) {}

  async document(createSpotInput: CreateSpotInput): Promise<SpotDocument> {
    const spot = await this.findOneByPlaceId(createSpotInput.place_id);
    const place: Place = await this.searchService.getIdenticalPlace(
      createSpotInput
    );

    if (place === undefined) {
      // TODO: custom place 만들기
      // pass
    }

    const createSpotDto = {
      place_id: place.id,
      location: { type: "Point", coordinates: [place.x, place.y] },
      ...place,
    };

    return new this.spotModel(createSpotDto);
  }

  async save(spotDocument: SpotDocument): Promise<Spot> {
    return spotDocument.save().catch((error) => {
      throw new HttpException(
        `cannot save a spot cause of ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    });
  }

  async appendSticker(
    spotId: Types.ObjectId,
    stickerId: Types.ObjectId
  ): Promise<Spot> {
    return this.spotModel
      .findOneAndUpdate({ _id: spotId }, { $push: { stickers: stickerId } })
      .catch((err) => {
        throw new HttpException(
          `cannot append sticker to spot cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async findOne(_id: Types.ObjectId): Promise<Spot> {
    return this.spotModel
      .findOne()
      .exec()
      .catch((err) => {
        throw new HttpException(
          `cannot find a spot cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async findOneByPlaceId(place_id: string): Promise<Spot> {
    return this.spotModel.findOne({ place_id }).exec();
  }

  async findAll(ids: Types.ObjectId[] | null = null): Promise<Spot[]> {
    const filters = ids ? { _id: { $in: ids } } : {};
    return this.spotModel
      .find(filters)
      .exec()
      .catch((err) => {
        throw new HttpException("bad request", HttpStatus.BAD_REQUEST);
      });
  }

  async remove(place_id: string) {
    return this.spotModel.remove({ place_id }).exec();
  }

  async getByKeyword(searchSpotDto: SearchSpotDto): Promise<Spot[]> {
    /*
    mongodb 한국어 쿼리 참고자료
    - https://ip99202.github.io/posts/nodejs,-mongodb-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5/
    - https://github.com/Tekiter/EZSET/blob/master/backend/src/api/v1/simple.route.js
    */
    const place_name: RegExp = new RegExp(searchSpotDto.keyword);
    return this.spotModel
      .find({ place_name })
      .exec()
      .catch((err) => {
        throw new HttpException(
          "There is no spots that matched by keyword.",
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async getNearSpots(searchSpotDto: SearchSpotDto): Promise<Spot[]> {
    const maxNumSpots: number = 15;
    const maxDistance: number = searchSpotDto.radius;
    return this.spotModel
      .aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [searchSpotDto.x, searchSpotDto.y],
            },
            distanceField: "dist.calculated",
            maxDistance,
            includeLocs: "dist.location",
            spherical: true,
          },
        },
        { $limit: maxNumSpots },
      ])
      .then((response) => response)
      .catch((error) => {
        throw new HttpException(
          `cannot get near spots cause of ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }

  async getNearSpotsByKeyword(searchSpotDto: SearchSpotDto): Promise<Spot[]> {
    const maxNumSpots: number = 15;
    const maxDistance: number = searchSpotDto.radius;
    const place_name: RegExp = new RegExp(searchSpotDto.keyword);
    return this.spotModel
      .aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [searchSpotDto.x, searchSpotDto.y],
            },
            distanceField: "dist.calculated",
            maxDistance,
            query: { place_name },
            includeLocs: "dist.location",
            spherical: true,
          },
        },
        { $limit: maxNumSpots },
      ])
      .then((response) => response)
      .catch((error) => {
        throw new HttpException(
          `cannot get near spots with keyword cause of ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }

  async populateStickers(spot_id: Types.ObjectId): Promise<Sticker[]> {
    // aggregate: https://gist.github.com/kdelemme/9659364#file-aggregate-js-L127
    // lookup: https://github.com/Automattic/mongoose/issues/5090
    // @TODO: 스티커 카운트 세기
    return this.spotModel
      .aggregate([
        {
          $match: { _id: spot_id },
        },
        {
          $lookup: {
            from: "stickers",
            localField: "stickers",
            foreignField: "_id",
            as: "stickers",
          },
        },
      ])
      .then((response) => response[0].stickers)
      .catch((error) => {
        throw new HttpException(
          `cannot populate a sticker cause of ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }
}
