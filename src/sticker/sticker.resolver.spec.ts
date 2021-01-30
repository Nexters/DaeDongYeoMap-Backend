import { Test, TestingModule } from '@nestjs/testing';
import { StickerResolver } from './sticker.resolver';
import { StickerService } from './sticker.service';

describe('StickerResolver', () => {
  let resolver: StickerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickerResolver, StickerService],
    }).compile();

    resolver = module.get<StickerResolver>(StickerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
