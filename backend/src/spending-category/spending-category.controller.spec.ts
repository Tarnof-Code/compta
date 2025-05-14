import { Test, TestingModule } from '@nestjs/testing';
import { SpendingCategoryController } from './spending-category.controller';

describe('SpendingCategoryController', () => {
  let controller: SpendingCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpendingCategoryController],
    }).compile();

    controller = module.get<SpendingCategoryController>(SpendingCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
