import { Byte } from "@angular/compiler/src/util";
import { Projects } from "./projects";

export class ImageProject{

    public id?:number;
    public name:string;
    public type:string;
    public picProject:File;
    public trabajo:Projects;

    constructor(name:string,type:string, picProject:File, trabajo:Projects){
        this.name = name;
        this.type = type;
        this.picProject = this.picProject;
        this.trabajo = this.trabajo;
    }
}