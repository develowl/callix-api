import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ILaunch } from '../interfaces/launch.interface';
import { launchMock } from '../mocks/launch.mock';
import { pageMock } from '../mocks/page-launch.mock';
import { LaunchesService } from '../services/launches.service';
import { LaunchesController } from './launches.controller';

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
            getOrThrow: jest.fn(() => 'http://localhost/mock')
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

    expect(service.getNextLaunch).toBeCalled();
    expect(response.upcoming).toEqual(true);
  });

  it('should return the latest launch', async () => {
    const data: ILaunch = { ...launchMock, upcoming: false };
    jest.spyOn(service, 'getLatestLaunch').mockResolvedValueOnce(data);
    const response = await controller.getLatestLaunch();

    expect(service.getLatestLaunch).toBeCalled();
    expect(response.upcoming).toEqual(false);
  });

  it('should return all upcoming launches', async () => {
    const data: ILaunch[] = [{ ...launchMock, upcoming: true }];
    jest.spyOn(service, 'getUpcomingLaunches').mockResolvedValueOnce(data);
    const response = await controller.getUpcomingLaunch();

    expect(service.getUpcomingLaunches).toBeCalled();
    expect(response.length).toEqual(1);
    expect(response[0].upcoming).toEqual(true);
  });

  it('should return all past launches', async () => {
    jest.spyOn(service, 'getPastLaunches').mockResolvedValueOnce(pageMock);
    const response = await controller.getPastLaunch({ page: 1 });

    expect(service.getPastLaunches).toBeCalled();
    expect(response.docs.length).toEqual(1);
    expect(response.docs[0].upcoming).toEqual(false);
    expect(response.page).toEqual(pageMock.page);
  });
});
