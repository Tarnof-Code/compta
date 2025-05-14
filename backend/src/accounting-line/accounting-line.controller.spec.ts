import { Test, TestingModule } from '@nestjs/testing';
import { AccountingLineController } from './accounting-line.controller';

describe('AccountingLineController', () => {
  let controller: AccountingLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountingLineController],
    }).compile();

    controller = module.get<AccountingLineController>(AccountingLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
