import { Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: string): Promise<CityEntity[]> {
    const cacheKey = `cities-from-state-${stateId}}`;

    let cities: CityEntity[] = await this.cacheService.get<CityEntity[]>(
      cacheKey,
    );

    if (!cities) {
      cities = await this.cityRepository.find({
        where: {
          stateId: stateId,
        },
      });

      await this.cacheService.set(cacheKey, cities);
    }

    return cities;
  }
}
