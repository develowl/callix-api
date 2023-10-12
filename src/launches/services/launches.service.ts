import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { ILaunch } from '../interfaces/launch.interface';

@Injectable()
export class LaunchesService {
  private baseUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.baseUrl = this.configService.getOrThrow<string>('SPACEX_API');
  }

  async getNextLaunch(): Promise<ILaunch> {
    const body = {
      query: {
        upcoming: true
      },
      options: {
        limit: 1,
        populate: ['rocket', 'crew.crew'],
        sort: {
          flight_number: 'desc'
        }
      }
    };
    const { data } = await this.httpService.axiosRef<{ docs: ILaunch[] }>({
      method: 'post',
      url: this.baseUrl,
      data: body
    });

    return data.docs[0];
  }

  async getLatestLaunch(): Promise<ILaunch> {
    const body = {
      query: {
        upcoming: false,
        $or: [{ details: { $ne: null } }, { 'links.wikipedia': { $ne: null } }]
      },
      options: {
        limit: 1,
        populate: ['rocket', 'crew.crew'],
        sort: {
          flight_number: 'desc'
        }
      }
    };
    const { data } = await this.httpService.axiosRef<{ docs: ILaunch[] }>({
      method: 'post',
      url: this.baseUrl,
      data: body
    });
    return data.docs[0];
  }

  async getUpcomingLaunches(): Promise<ILaunch[]> {
    const body = {
      query: {
        upcoming: true
      },
      options: {
        limit: 9999,
        populate: ['rocket', 'crew.crew'],
        sort: {
          flight_number: 'desc'
        }
      }
    };
    const { data } = await this.httpService.axiosRef<{ docs: ILaunch[] }>({
      method: 'post',
      url: this.baseUrl,
      data: body
    });
    return data.docs;
  }

  async getPastLaunches(query?: PageOptionsDto): Promise<PageDto<ILaunch>> {
    const body = {
      query: {
        upcoming: false,
        $or: [{ details: { $ne: null } }, { 'links.wikipedia': { $ne: null } }]
      },
      options: {
        limit: 32,
        page: query?.page ?? 1,
        populate: ['rocket', 'crew.crew'],
        sort: {
          flight_number: 'desc'
        }
      }
    };
    const { data } = await this.httpService.axiosRef<PageDto<ILaunch>>({
      method: 'post',
      url: this.baseUrl,
      data: body
    });
    return data;
  }
}
