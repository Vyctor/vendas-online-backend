import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), CacheModule],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
