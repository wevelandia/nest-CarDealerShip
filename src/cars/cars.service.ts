import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {

    private cars = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: 3,
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
    findOneById( id: number ) {
        // Definimos una constante donde vamos a buscar un carro donde el Id del carro sea igual al id recibido
        const car = this.cars.find( car => car.id === id );

        // Realizamos el manejo de Exception Filter para el manejo de los errores, por ejemplo para cuando el carro no exista.
        if ( !car ) {
            // Con `` definimos un mensaje que le queremos enviar como adicional
            throw new NotFoundException(`Car with id '${ id }' not found`);
        } 

        return car;
    }

}
