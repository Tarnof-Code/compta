import { Module } from '@nestjs/common';
import { SpendingCategoryController } from './spending-category.controller';
import { SpendingCategoryService } from './spending-category.service';

@Module({
  controllers: [SpendingCategoryController],
  providers: [SpendingCategoryService]
})
export class SpendingCategoryModule {}
