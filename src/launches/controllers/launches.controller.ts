import { Controller, Get } from '@nestjs/common';
import { ILaunch } from '../interfaces/launch.interface';
import { LaunchesService } from '../services/launches.service';

@Controller('launches')
export class LaunchesController {
  constructor(private readonly launchesService: LaunchesService) {}

  @Get('next')
  async getNextLaunch(): Promise<ILaunch> {
    return this.launchesService.getNextLaunch();
  }

  @Get('latest')
  async getLatestLaunch(): Promise<ILaunch> {
    return this.launchesService.getLatestLaunch();
  }

  @Get('upcoming')
  async getUpcomingLaunch(): Promise<ILaunch[]> {
    return this.launchesService.getUpcomingLaunches();
  }

  @Get('past')
  async getPastLaunch(): Promise<ILaunch[]> {
    return this.launchesService.getPastLaunches();
  }
}
