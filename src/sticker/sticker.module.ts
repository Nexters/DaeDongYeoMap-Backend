import { Module } from '@nestjs/common';
import { StickerService } from './sticker.service';
import { StickerResolver } from './sticker.resolver';

@Module({
  providers: [StickerResolver, StickerService]
})
export class StickerModule {}
