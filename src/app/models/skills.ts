import { Persona } from "./persona";

export class Skills {

    public id?:number;
    public habilidad:string;
    public porcentaje:number;
    public persona?:Persona;

    constructor(habilidad:string,porcentaje:number){
        this.habilidad = habilidad;
        this.porcentaje = porcentaje;
    }
}
