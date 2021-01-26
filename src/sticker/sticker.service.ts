import { Injectable } from '@nestjs/common';
import { CreateStickerInput } from './dto/create-sticker.input';
import { UpdateStickerInput } from './dto/update-sticker.input';

@Injectable()
export class StickerService {
  create(createStickerInput: CreateStickerInput) {
    return 'This action adds a new sticker';
  }

  findAll() {
    return `This action returns all sticker`;
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
