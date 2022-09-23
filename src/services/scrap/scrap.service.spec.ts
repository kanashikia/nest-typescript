import { Test, TestingModule } from '@nestjs/testing';
import { scrapPayloadFormat } from 'src/controllers/scrap/scrap.controller';
import { ScrapService } from './scrap.service';

describe('ScrapService', () => {
  let service: ScrapService;
  let params: scrapPayloadFormat;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapService],
    }).compile();

    service = module.get<ScrapService>(ScrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should scrapByClass return the right value', () => {
    params = {
      url: 'https://www.npmjs.com/package/xpath-html',
      customPath: 'a0dff0b1',
    };
    expect(service.scrapByClass(params)).toBe('Keywords');
  });
});
