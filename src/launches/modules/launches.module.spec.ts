import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LaunchesController } from '../controllers/launches.controller';
import { LaunchesService } from '../services/launches.service';
import { LaunchesModule } from './launches.module';

describe('LaunchesModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), LaunchesModule]
    }).compile();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  it('should have Launches components', async () => {
    expect(module.get(LaunchesController)).toBeInstanceOf(LaunchesController);
    expect(module.get(LaunchesService)).toBeInstanceOf(LaunchesService);
  });
});
