import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateStickerInput, UpdateStickerInput } from "./dto/sticker.input";
import { Sticker, StickerDocument } from "./entities/sticker.entity";
import { SpotService } from "../spot/spot.service";
import { Spot, SpotDocument } from "../spot/entities/spot.entity";
import { CreateSpotInput } from "../spot/dto/create-spot.input";

@Injectable()
export class StickerService {
  constructor(
    @InjectModel(Sticker.name) private stickerModel: Model<StickerDocument>,
    private readonly spotService: SpotService
  ) {}

  async create(createStickerInput: CreateStickerInput) {
    /**
     * 0. create sticker object
     * 1. spot find or create spot
     * 2. save spot or update spot
     * 3. save sticker
     */

    const stickerDocument: StickerDocument = new this.stickerModel(
      createStickerInput
    );

    let spot:
      | Spot
      | SpotDocument
      | null = await this.spotService.findOneByPlaceId(
      createStickerInput.place_id
    );

    if (spot === null) {
      spot = await this.spotService.document(
        createStickerInput as CreateSpotInput
      );
      spot.stickers.push(stickerDocument._id);
      await this.spotService.save(spot as SpotDocument);
    } else {
      spot = await this.spotService.appendSticker(
        spot._id,
        stickerDocument._id
      );
    }

    stickerDocument.spot = spot._id;
    return stickerDocument.save().catch((error) => {
      throw new HttpException(
        `cannot create a sticker cause of ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    });
  }

  async update(updateStickerInput: UpdateStickerInput): Promise<Sticker> {
    return this.stickerModel
      .findOneAndUpdate(
        { _id: updateStickerInput._id },
        { $set: updateStickerInput },
        { new: true }
      )
      .exec()
      .catch((err) => {
        throw new HttpException(
          `cannot update a sticker cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async findOne(_id: Types.ObjectId): Promise<Sticker> {
    return this.stickerModel
      .findOne()
      .exec()
      .catch((err) => {
        throw new HttpException(
          `cannot find a sticker cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async findAll(ids: Types.ObjectId[] | null = null): Promise<Sticker[]> {
    const filters = ids ? { _id: { $in: ids } } : {};
    return this.stickerModel
      .find(filters)
      .exec()
      .catch((err) => {
        throw new HttpException(
          `cannot find stickers cause of ${err.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async getAllSpots(stickerIds: Types.ObjectId[]): Promise<Spot[]> {
    const stickers: Sticker[] = await this.findAll(stickerIds);

    const spotIds: Types.ObjectId[] = stickers.map(
      (s) => s.spot as Types.ObjectId
    );

    return this.spotService.findAll(spotIds);
  }
}
