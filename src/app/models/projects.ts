import { Persona } from "./persona";

export class Projects {

    public id?:number;
    public titulo:string;
    public descripcion:string;
    public linkTrabajo:string;
    public persona:Persona;
    public bytePic:File;

    constructor(titulo:string, descripcion:string, linkTrabajo:string, persona:Persona, bytePic:File){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.linkTrabajo = linkTrabajo;
        this.persona = persona;
        this.bytePic = bytePic;
    }
}
