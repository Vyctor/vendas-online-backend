import { Controller, Get, Param } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:stateId')
  async getAllCitiesByStateId(
    @Param('stateId') stateId: string,
  ): Promise<CityEntity[]> {
    const cities = await this.cityService.getAllCitiesByStateId(stateId);
    return cities;
  }
}
