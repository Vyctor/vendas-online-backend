import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { CityService } from './city.service';
import { CityController } from './city.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity]),
    CacheModule.register({
      ttl: 60 * 60 * 24,
    }),
  ],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
