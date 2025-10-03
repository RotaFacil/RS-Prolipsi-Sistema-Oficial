import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return status from service', () => {
    const result = {
      status: 'ok',
      service: 'api',
      timestamp: '2023-01-01T00:00:00.000Z'
    };
    
    jest.spyOn(service, 'getStatus').mockImplementation(() => result);
    
    expect(controller.root()).toBe(result);
  });
});