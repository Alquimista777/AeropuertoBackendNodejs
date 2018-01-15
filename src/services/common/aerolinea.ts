export class Location{
    type:string;
    coordinates:number[];
}
export class Ticket{
    disponible:boolean;
    numero:number;

}
export class Aerolinea{
    _id:string;
    nombre:string;
    direccion:string;
    imagen:string;
    ticket?:Ticket[];
    localizacion:Location;
}