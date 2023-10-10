import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { launchMock } from '../src/launches/mocks/launch.mock';
import { LaunchesModule } from '../src/launches/modules/launches.module';
import { LaunchesService } from '../src/launches/services/launches.service';

describe('Launches', () => {
  let app: INestApplication;
  let service = {
    getNextLaunch: () => ({ ...launchMock, upcoming: true }),
    getLatestLaunch: () => ({ ...launchMock, upcoming: false }),
    getUpcomingLaunches: () => [{ ...launchMock, upcoming: true }],
    getPastLaunches: () => [{ ...launchMock, upcoming: false }]
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LaunchesModule]
    })
      .overrideProvider(LaunchesService)
      .useValue(service)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET next launch`, () => {
    return request(app.getHttpServer())
      .get('/launches/next')
      .expect(200)
      .expect(service.getNextLaunch());
  });

  it(`/GET latest launch`, () => {
    return request(app.getHttpServer())
      .get('/launches/latest')
      .expect(200)
      .expect(service.getLatestLaunch());
  });

  it(`/GET upcoming launches`, () => {
    return request(app.getHttpServer())
      .get('/launches/upcoming')
      .expect(200)
      .expect(service.getUpcomingLaunches());
  });

  it(`/GET past launches`, () => {
    return request(app.getHttpServer())
      .get('/launches/past')
      .expect(200)
      .expect(service.getPastLaunches());
  });

  afterAll(async () => {
    await app.close();
  });
});
