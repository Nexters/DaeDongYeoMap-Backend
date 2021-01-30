import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { SearchService } from "src/place/kakaoMapSearch/search.service";
import { SortType } from "src/place/kakaoMapSearch/search.dto";
import { CreateSpotInput } from "src/spot/dto/create-spot.input";
import { UpdateSpotInput } from "src/spot/dto/update-spot.input";
import { Spot, SpotDocument } from "src/spot/entities/spot.entity";
import { Place } from "src/place/place.entity";
import { Sticker } from "src/sticker/entities/sticker.entity";

@Injectable()
export class SpotService {
  constructor(
    @InjectModel(Spot.name) private spotModel: Model<SpotDocument>,
    private readonly searchService: SearchService
  ) {}

  async document(createSpotInput: CreateSpotInput): Promise<SpotDocument> {
    const spot = await this.findOneByPlaceId(createSpotInput.placeId);
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
      location,
      ...place,
    };

    return new this.spotModel(createSpotDto);
  }

  async save(spotDocument: SpotDocument): Promise<Spot> {
    return spotDocument.save().catch((error) => {
      console.error(error);
      throw new HttpException(
        `cannot save a spot cause of ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    });
  }

  // async update(_id: Types.ObjectId, ): Promise<Spot> {
  //   return this.spotModel
  //     .findOneAndUpdate({ _id }, { $push: { emojis: emoji } })
  //     .catch((err) => {
  //       console.error(err);
  //       throw new HttpException(
  //         `cannot update spot cause of ${err.message}`,
  //         HttpStatus.BAD_REQUEST
  //       );
  //     });
  // }

  async appendSticker(
    spotId: Types.ObjectId,
    stickerId: Types.ObjectId
  ): Promise<Spot> {
    return this.spotModel
      .findOneAndUpdate({ _id: spotId }, { $push: { stickers: stickerId } })
      .catch((err) => {
        console.error(err);
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
        console.error(err);
        throw new HttpException(
          `cannot find a spot cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async findOneByPlaceId(placeId: string): Promise<Spot> {
    return this.spotModel.findOne({ placeId }).exec();
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

  async remove(placeId: string) {
    return this.spotModel.remove({ placeId }).exec();
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
        console.error(error);
        throw new HttpException(
          `cannot populate a sticker cause of ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      });
  }
}
