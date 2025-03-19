import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ];

    // Ceamos unos metodos aca por el momento para retornar todos los carros.
    finadAll() {
        // Aca se estaria enviando los datos por referencia y los pueden modificar, pero ya despues como vienen de una DB no habria problema. 
        return this.cars;
    }

    // Creamos un metodo para consultar por Id
    findOneById( id: string ) {
        // Definimos una constante donde vamos a buscar un carro donde el Id del carro sea igual al id recibido
        const car = this.cars.find( car => car.id === id );

        // Realizamos el manejo de Exception Filter para el manejo de los errores, por ejemplo para cuando el carro no exista.
        if ( !car ) {
            // Con `` definimos un mensaje que le queremos enviar como adicional
            throw new NotFoundException(`Car with id '${ id }' not found`);
        } 

        return car;
    }

    // Creamos un nuevo metodo para adicionar un Car.
    create( createCardDto: CreateCarDto ) {

        // Definimos una constante para manejar lo que recibimos para el nuevo carro y le creamos su nuevo uuid y los demas campos los desestructuramos para que e cada uno de ellos se almacene lo que viene de la petición.
        const car: Car = {
            id: uuid(),
            ...createCardDto,
        }

        this.cars.push( car );

        return car;
    }

    // Creamos un nuevo metodo para el Patch.
    update( id: string, updateCarDto: UpdateCarDto ) {
        // Aca definimos los que se hace actualizar el carro, pero si se maneja una Base de Dats elcódigo es más facil
        // Si pasa esta linea es porque tenemos un carro
        let carDB = this.findOneById( id );

        if( updateCarDto.id && updateCarDto.id !== id )
            throw new BadRequestException(`Car id is not valid inside body`);

        // Este map me permite iterar todos los elementos 
        // Iteramos sobre los autos y actualizamos el correspondiente
        this.cars = this.cars.map( car => {

            if ( car.id === id ) {
                // Lo que hacemos aca es que tomamos los datos de carDB y los actualizamos con los datos que vienen en updateCarDto, y como se envia tambien el id, con ello aseguramos que ese dato no se cambia. 
                carDB = { ...carDB, ...updateCarDto, id }
                return carDB;
            }

            return car;

        })

        return carDB; // carro actualziado
    }
}
