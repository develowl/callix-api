import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { launchMock } from '../mocks/launch.mock';
import { LaunchesService } from '../services/launches.service';
import { LaunchesController } from './launhces.controller';

describe('LaunchesController', () => {
  let controller: LaunchesController;
  let service: LaunchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaunchesController],
      providers: [
        LaunchesService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: jest.fn()
          }
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => 'http://localhost/mock')
          }
        }
      ]
    }).compile();

    controller = module.get<LaunchesController>(LaunchesController);
    service = module.get<LaunchesService>(LaunchesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the next launch', async () => {
    const data = { ...launchMock, upcoming: true };
    jest.spyOn(service, 'getNextLaunch').mockResolvedValueOnce(data);
    const response = await controller.getNextLaunch();

    expect(response.upcoming).toEqual(true);
  });
});
