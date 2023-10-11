// import { TestBed } from '@automock/jest';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ILaunch } from '../interfaces/launch.interface';
import { launchMock } from '../mocks/launch.mock';
import { LaunchesService } from './launches.service';

describe('LaunchesService', () => {
  let service: LaunchesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<LaunchesService>(LaunchesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the next launch', async () => {
    const data: ILaunch = { ...launchMock, upcoming: true };
    jest.spyOn(httpService, 'axiosRef').mockResolvedValueOnce({ data });
    const response = await service.getNextLaunch();

    expect(response.upcoming).toEqual(true);
  });

  it('should return the latest launch', async () => {
    const data: ILaunch = { ...launchMock, upcoming: false };
    jest.spyOn(httpService, 'axiosRef').mockResolvedValueOnce({ data });
    const response = await service.getLatestLaunch();

    expect(response.upcoming).toEqual(false);
  });

  it('should return all upcoming launches', async () => {
    const data: ILaunch[] = [{ ...launchMock, upcoming: true }];
    jest.spyOn(httpService, 'axiosRef').mockResolvedValueOnce({ data });
    const response = await service.getUpcomingLaunches();

    expect(response.length).toEqual(1);
    expect(response[0].upcoming).toEqual(true);
  });

  it('should return all past launches', async () => {
    const data: ILaunch[] = [{ ...launchMock, upcoming: false }];
    jest.spyOn(httpService, 'axiosRef').mockResolvedValueOnce({ data });
    const response = await service.getPastLaunches();

    expect(response.length).toEqual(1);
    expect(response[0].upcoming).toEqual(false);
  });
});
