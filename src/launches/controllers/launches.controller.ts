import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { ILaunch } from '../interfaces/launch.interface';
import { launchMock } from '../mocks/launch.mock';
import { LaunchesService } from '../services/launches.service';

@ApiTags('Launches Operations')
@Controller('launches')
export class LaunchesController {
  constructor(private readonly launchesService: LaunchesService) {}

  @ApiOkResponse({
    description: 'Get next launch',
    schema: { example: launchMock }
  })
  @Get('next')
  async getNextLaunch(): Promise<ILaunch> {
    return this.launchesService.getNextLaunch();
  }

  @ApiOkResponse({
    description: 'Get latest launch',
    schema: { example: launchMock }
  })
  @Get('latest')
  async getLatestLaunch(): Promise<ILaunch> {
    return this.launchesService.getLatestLaunch();
  }

  @ApiOkResponse({
    description: 'Get upcoming launches',
    schema: { example: [launchMock] }
  })
  @Get('upcoming')
  async getUpcomingLaunch(): Promise<ILaunch[]> {
    return this.launchesService.getUpcomingLaunches();
  }

  @ApiOkResponse({
    description: 'Get past launches',
    schema: { example: [launchMock] }
  })
  @Get('past')
  async getPastLaunch(
    @Query() query: PageOptionsDto
  ): Promise<PageDto<ILaunch>> {
    return this.launchesService.getPastLaunches(query);
  }
}
