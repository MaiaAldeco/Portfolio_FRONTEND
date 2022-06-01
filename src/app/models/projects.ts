import { Persona } from "./persona";

export class Projects {

    public id?:number;
    public titulo:string;
    public descripcion:string;
    public linkTrabajo:string;
    public imagen:string;
    public persona:Persona;

    constructor(titulo:string, descripcion:string, persona:Persona){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.persona = persona;
    }
}
