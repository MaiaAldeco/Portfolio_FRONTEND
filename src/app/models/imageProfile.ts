
export class ImageProfile{

    public id?:number;
    public name:string;
    public type:string;
    public picByte:File;

    constructor(name:string,type:string, picByte:File){
        this.name = name;
        this.type = type;
        this.picByte = this.picByte;
    }
}