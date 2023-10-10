import { Controller } from '@nestjs/common';
import { LaunchesService } from '../services/launches.service';

@Controller('launches')
export class LaunchesController {
  constructor(private readonly launchesService: LaunchesService) {}
}
