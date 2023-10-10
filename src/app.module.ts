import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LaunchesModule } from './launches/launches.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LaunchesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
