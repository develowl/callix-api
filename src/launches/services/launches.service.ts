import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    const url = `${this.baseUrl}/next`;
    const { data } = await this.httpService.axiosRef<ILaunch>({
      method: 'get',
      url
    });
    return data;
  }

  async getLatestLaunch(): Promise<ILaunch> {
    const url = `${this.baseUrl}/latest`;
    const { data } = await this.httpService.axiosRef<ILaunch>({
      method: 'get',
      url
    });
    return data;
  }

  async getUpcomingLaunches(): Promise<ILaunch[]> {
    const url = `${this.baseUrl}/upcoming`;
    const { data } = await this.httpService.axiosRef<ILaunch[]>({
      method: 'get',
      url
    });
    return data;
  }
}
