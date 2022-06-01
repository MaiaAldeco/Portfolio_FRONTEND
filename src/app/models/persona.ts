import { Contact } from "./contact";
import { Usuario } from "./usuario";

export class Persona {

    public id?:number;
    public nombre:string;
    public apellido:string;
    public stack:string;
    public tecnologia:string;
    public descripcion:string;
    public contacto:Contact;
    public usuario:Usuario;

    constructor(nombre:string, apellido:string, stack:string, tecnologia:string, descripcion:string, contacto:Contact, usuario:Usuario){
        this.nombre = nombre;
        this.apellido = apellido;
        this.stack = stack;
        this.tecnologia = tecnologia;
        this.descripcion = descripcion;
        this.contacto = contacto;
        this.usuario = usuario;
    }
}
