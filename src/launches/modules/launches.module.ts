import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LaunchesController } from '../controllers/launches.controller';
import { LaunchesService } from '../services/launches.service';

@Module({
  imports: [HttpModule],
  controllers: [LaunchesController],
  providers: [LaunchesService]
})
export class LaunchesModule {}
