import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesService],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return "Message and the id when promise resolves', async () => {
    const result = await service.getMessage(1);
    expect(result).toBe('Message numéro 1');
  });
});
