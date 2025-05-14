import { Test, TestingModule } from '@nestjs/testing';
import { SpendingCategoryService } from './spending-category.service';

describe('SpendingCategoryService', () => {
  let service: SpendingCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpendingCategoryService],
    }).compile();

    service = module.get<SpendingCategoryService>(SpendingCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
