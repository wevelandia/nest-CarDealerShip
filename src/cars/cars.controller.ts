import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

// Este controlador lo que hace es escuchar una petición y dar una respuesta.
@Controller('cars')
export class CarsController {

    // Creamos el metodo de constructor, donde vamos a inyectar la dependencia de nuestro servicio, en este caso cars.service
    constructor(
        private readonly carsService: CarsService 
    ) {}

    // Le ponemos el decorador @Get()
    @Get() 
    getAllCars() {
        return this.carsService.finadAll();
    }

    // Creamos otro metodo para consultar un carro por Id.
    // Aca en el decorador le colocamos un comodin que indica que esa peticion viene con un Id.
    // Usamos el decorador Param para poder decir que el id que se recibe es el mismo que se utiliza en el metodo.
    @Get(':id')
    // En @Param('id') adicionamos un Pipe para transformar la información
    getCarbyid( @Param('id', ParseIntPipe) id: number ) {
        console.log({ id });
        // Si enviamos asi la impresión por consola el mensaje que se obtiene no es un numero sino in NaN
        //console.log({ +id });
        
        // Como se recibe un tipo number debemos de convertir ese string en numero de las sguientes maneras:
        // Reaizamos la validacion inicial si es un numero lo que envian

        //return this.carsService.findOneById( Number(id) );
        return this.carsService.findOneById( +id );
    }
    
    // Creamos el metodo para crea un car.
    @Post()
    createCar( @Body() body: any ) {
        /*return {
            ok: true,
            method: 'POST',
        }*/
       return body;
    }

    // Creamos el metodo para actualizar un car.
    @Patch(':id')
    updateCar( 
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any ) {
       return body;
    }

    // Creamos el metodo para borrar un car.
    @Delete(':id')
    deleteCar( @Param('id', ParseIntPipe) id: number ) {
       return {
        method: 'Delete',
        id
       };
    }
}
