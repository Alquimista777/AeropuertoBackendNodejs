export class AerolineaVuelo{
    _id:string;
    nombre:string;
    
}
export class silla{
    numero:number;
    disponible:boolean;
}
export class Vuelo{
    _id:string;
    nombre : string;
    precio: number;
    categoria:string;
    silla:silla;
    aerolinea:AerolineaVuelo;
}