// Definimos nuestro DTO (Data transfer object). Es un objeto que me sirve para transferir esa data en diferentes piesas de mi aplicación.
// Esta definicion de los DTO se definen como clases ya que se pueden allí crear metodos para validarla información que viene. No se pueden definir como interface orqueno me permitiria hacer dichas validaciones.

import { IsString, MinLength } from "class-validator";

// Lo que estoy esperando recibir de la petición del usuario son solo los datos de brand y model. Y debemos de definirlas como solo lectura para no cambiar lo que recibimos.
export class CreateCarDto {

    // Debemos de ir aplicando decoradores para las validaciones.
    // Si se desea enviar un mensaje personalizado se programa así: 
    // @IsString({ message: `The brand most be a cool string` })
    @IsString()
    readonly brand: string;

    // Un ejemplo de otro Pipe es por ejemplo decir del tamaño en caracteres de lo que se debe recibir por ejemplo el siguiente:
    // @MinLength(3)
    @IsString()
    readonly model: string;

}