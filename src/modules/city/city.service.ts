import { Inject, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {}

  async getAllCitiesByStateId(stateId: string): Promise<CityEntity[]> {
    const cacheKey = `cities-from-state-${stateId}}`;

    let cities: CityEntity[] = await this.cacheManager.get(cacheKey);

    if (!cities) {
      cities = await this.cityRepository.find({
        where: {
          stateId: stateId,
        },
      });

      await this.cacheManager.set(cacheKey, cities);
    }

    return cities;
  }
}
