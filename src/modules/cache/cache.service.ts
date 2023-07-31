import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheStore, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {}

  public async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, {
      ttl: ttl,
    });
  }

  public async get<T>(key: string): Promise<T> {
    return await this.cacheManager.get<T>(key);
  }
}
