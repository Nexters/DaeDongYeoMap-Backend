import { Test, TestingModule } from '@nestjs/testing';
import { StickerService } from './sticker.service';

describe('StickerService', () => {
  let service: StickerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StickerService],
    }).compile();

    service = module.get<StickerService>(StickerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
