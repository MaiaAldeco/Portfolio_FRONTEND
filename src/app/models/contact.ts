export class Contact {

    public id?:number;
    public localidad:string;
    public telefono:string;
    public email:string;

    constructor(localidad:string, telefono:string, email:string){
        this.localidad = localidad;
        this.telefono = telefono;
        this.email = email;
    }
}
