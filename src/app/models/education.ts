import { Persona } from "./persona";

export class Education {

    public id?:number;
    public lugar:string;
    public curso:string;
    public fechaInicio:Date;
    public fechaFin?:Date;
    public persona:Persona;

    constructor(lugar:string, curso:string, fechaInicio:Date, fechaFin:Date, persona:Persona){
        this.lugar = lugar;
        this.curso = curso;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.persona = persona;
    }
}
