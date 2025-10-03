import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return status object with correct properties', () => {
    const result = service.getStatus();
    
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('service');
    expect(result).toHaveProperty('timestamp');
    
    expect(result.status).toBe('ok');
    expect(result.service).toBe('api');
    expect(typeof result.timestamp).toBe('string');
  });
});