import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

// Todos lo sservicios son Provider, pero no todos los Provider son Servicios.
// Acá debemos de definir la logica del servicio.
@Module({
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule {}
