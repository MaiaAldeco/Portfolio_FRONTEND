import { Persona } from "./persona";

export class Experience {

    public id?:number;
    public nombre:string;
    public puesto:string;
    public descripcion?:string;
    public fechaInicio:Date;
    public fechaFin?:Date;
    public persona:Persona;

    constructor(nombre:string,puesto:string,descripcion:string,fechaInicio:Date, fechaFin:Date,persona:Persona){
        this.nombre = nombre;
        this.puesto = puesto;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.persona = persona;
    }
}
