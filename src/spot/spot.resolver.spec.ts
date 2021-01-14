import { Test, TestingModule } from '@nestjs/testing';
import { SpotResolver } from './spot.resolver';
import { SpotService } from './spot.service';

describe('SpotResolver', () => {
  let resolver: SpotResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotResolver, SpotService],
    }).compile();

    resolver = module.get<SpotResolver>(SpotResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
