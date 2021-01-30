import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateStickerInput } from "./dto/create-sticker.input";
import { UpdateStickerInput } from "./dto/update-sticker.input";
import { Sticker, StickerDocument } from "./entities/sticker.entity";
import { SpotService } from "src/spot/spot.service";
import { Spot, SpotDocument } from "src/spot/entities/spot.entity";
import { CreateSpotInput } from "src/spot/dto/create-spot.input";

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
      createStickerInput.placeId
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
      console.error(error);
      throw new HttpException(
        `cannot create a sticker cause of ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    });
  }

  async findAll(): Promise<Sticker[]> {
    return this.stickerModel
      .find()
      .exec()
      .catch((err) => {
        console.error(err);
        throw new HttpException("bad request", HttpStatus.BAD_REQUEST);
      });
  }

  findOne(id: number) {
    return `This action returns a #${id} sticker`;
  }

  update(id: number, updateStickerInput: UpdateStickerInput) {
    return `This action updates a #${id} sticker`;
  }

  remove(id: number) {
    return `This action removes a #${id} sticker`;
  }
}
