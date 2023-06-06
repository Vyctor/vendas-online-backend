import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './modules/state/state.module';
import { CityModule } from './modules/city/city.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      type: 'postgres',
      synchronize: false,
      entities: [`${__dirname}/**/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/infra/db/typeorm/migrations/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
