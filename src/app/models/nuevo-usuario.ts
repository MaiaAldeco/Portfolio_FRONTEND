export class NuevoUsuario {

    public nombre:string;
    public nombreUsuario:string;
    public email:string;
    public password:string;
    public authorities:string[]

    constructor(nombre:string,nombreUsuario:string,email:string,password:string){
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
    }
}
