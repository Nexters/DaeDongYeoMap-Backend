import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { SearchService } from "../place/kakaoMapSearch/search.service";

import { CreateSpotInput } from "../spot/dto/create-spot.input";
import { CreateCustomSpotInput } from "./dto/create-custom-spot.input";
import { UpdateCustomSpotInput } from "./dto/update-custom-spot.input";
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

  async document(
    createSpotInput: CreateSpotInput
  ): Promise<SpotDocument | Spot> {
    const place: Place = await this.searchService.getIdenticalPlace(
      createSpotInput
    );

    if (place === null) {
      throw new HttpException(
        "잘못된 place정보(카카오 api에 없거나, 커스텀 스팟에 없는 place 경우) 때문에 spot을 생성할 수 없습니다.",
        HttpStatus.BAD_REQUEST
      );
    }

    if (place.id !== createSpotInput.place_id) {
      // 정책: place id랑 다를 경우라도, 오타로 간주하고 저장시킨다.
      const spot: Spot = await this.findOneByPlaceId(place.id);
      if (spot !== null) return spot;
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

  async createCustomSpot(
    createCustomSpotInput: CreateCustomSpotInput
  ): Promise<Spot> {
    if (!createCustomSpotInput.is_custom) {
      throw new HttpException(
        "커스텀 스팟은 is_custom이 true여야 합니다.",
        HttpStatus.BAD_REQUEST
      );
    }
    const createSpotDto = {
      location: {
        type: "Point",
        coordinates: [createCustomSpotInput.x, createCustomSpotInput.y],
      },
      ...createCustomSpotInput,
    };

    const customSpotDocument: SpotDocument = await new this.spotModel(
      createSpotDto
    );

    // 커스텀 스팟의 경우 place_id에 spot_id를 넣는다. (unique key 확보)
    // 추가로 카카오 place_id는 string이기 때문에 mongodb objectId와 매칭될 수 없으므로 unique 만족한다.
    customSpotDocument.place_id = customSpotDocument._id.toString();

    return customSpotDocument.save().catch((error) => {
      throw new HttpException(
        `cannot save a custom spot cause of ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    });
  }

  async updateCustomSpot(
    updateCustomSpotInput: UpdateCustomSpotInput
  ): Promise<Spot> {
    if (!updateCustomSpotInput.is_custom) {
      throw new HttpException(
        "커스텀 스팟은 is_custom이 true여야 합니다.",
        HttpStatus.BAD_REQUEST
      );
    }

    const customSpot: SpotDocument = await this.findOne(
      updateCustomSpotInput._id
    );

    console.log(customSpot);

    if (customSpot.is_custom_share) {
      throw new HttpException(
        "공개 설정이된 커스텀 스팟은 수정할 수 없습니다.",
        HttpStatus.BAD_REQUEST
      );
    }

    updateCustomSpotInput["location"] = {
      coordinates: [updateCustomSpotInput.x, updateCustomSpotInput.y],
    };

    return this.spotModel
      .findOneAndUpdate(
        { _id: updateCustomSpotInput._id },
        { $set: updateCustomSpotInput },
        { new: true }
      )
      .catch((error) => {
        throw new HttpException(
          `cannot update a custom spot cause of ${error.message}`,
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

  async findOne(_id: Types.ObjectId): Promise<SpotDocument> {
    return this.spotModel
      .findById(_id)
      .exec()
      .catch((err) => {
        throw new HttpException(
          `cannot find a spot cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async findOneByPlaceId(place_id: string): Promise<SpotDocument> {
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
