import { PageDto } from 'src/common/dto/page.dto';
import { ILaunch } from '../interfaces/launch.interface';
import { launchMock } from './launch.mock';

export const pageMock: PageDto<ILaunch> = {
  docs: [{ ...launchMock, upcoming: false }],
  totalDocs: 1,
  limit: 1,
  totalPages: 1,
  page: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: 1,
  nextPage: 1
};
