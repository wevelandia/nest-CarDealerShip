import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

// Este controlador lo que hace es escuchar una petición y dar una respuesta.
@Controller('cars')
// Aca podriamos definir de una vez ValidationPipe para recibir los datos extactos de un DTO, pero si tengo otros DTO debo de colocar ello en cada uno de los archivos, por ello es mejor definir esto a manera global en el proyecto.
// @UsePipes( ValidationPipe )
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
    // getCarbyid( @Param('id', ParseIntPipe) id: number ) {
    // Aca usamos el Pipe: ParseUUIDPipe para validar que el id que se recibe sea un UUID valido.  Si el id no es un UUID valido la aplicación retorna un error 400.
    // getCarbyid( @Param('id', ParseUUIDPipe) id: string ) {
    // Si se desea realizar la validación de que el UUID corresponda a una version se programa así:
    //getCarbyid( @Param('id', new ParseUUIDPipe({ version : '4' }) ) id: string ) {
    getCarbyid( @Param('id', ParseUUIDPipe) id: string ) {
        console.log({ id });
        // Si enviamos asi la impresión por consola el mensaje que se obtiene no es un numero sino in NaN
        //console.log({ +id });
        
        // Como se recibe un tipo number debemos de convertir ese string en numero de las sguientes maneras:
        // Reaizamos la validacion inicial si es un numero lo que envian

        //return this.carsService.findOneById( Number(id) );
        return this.carsService.findOneById( id );
    }
    
    // Creamos el metodo para crea un car.
    // Aca debemos de hacer uso del DTO creado y lo que hacemos es que el createCarDto sea de ese tipo CreateCarDto.  
    @Post()
    // Aca hacemos uso de los Pipes, se comentarea para manejar de manera global al proyecto porque si se tienen mas de un DTO no es necesario colocarlos en cada metodo, de una vez me aplica todo a manera global.
    // @UsePipes( ValidationPipe )
    createCar( @Body() createCarDto: CreateCarDto ) {
        /*return {
            ok: true,
            method: 'POST',
        }*/
       return this.carsService.create( createCarDto );
    }

    // Creamos el metodo para actualizar un car.
    @Patch(':id')
    updateCar( 
        @Param( 'id', ParseUUIDPipe ) id: string,
        @Body() updateCarDto: UpdateCarDto ) {
       return this.carsService.update( id, updateCarDto );
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
