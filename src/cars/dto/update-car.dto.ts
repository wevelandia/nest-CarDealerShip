// Definimos nuestro DTO (Data transfer object). 
import { IsOptional, IsString, IsUUID } from "class-validator";

// Lo que estoy esperando recibir de la petición del usuario son solo los datos de brand y model. Y debemos de definirlas como solo lectura para no cambiar lo que recibimos.
export class UpdateCarDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?:    string;

    @IsString()
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @IsOptional()
    readonly model?: string;

}