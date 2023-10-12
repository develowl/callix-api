import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LaunchesController } from '../controllers/launches.controller';
import { LaunchesService } from '../services/launches.service';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'spacex-key': 'b163f2e0-8d9d-401b-aa34-fce356ffaa44'
      }
    })
  ],
  controllers: [LaunchesController],
  providers: [LaunchesService]
})
export class LaunchesModule {}
