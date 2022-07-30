import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ImageProfile } from "../models/ImageProfile";

@Injectable({
    providedIn: 'root'
})

export class ImageProfileService {

    imageURL = environment.imageURL;

    constructor(private httpClient: HttpClient) { }

    public lista(): Observable<ImageProfile[]>{
        return this.httpClient.get<ImageProfile[]>(this.imageURL + 'lista')
      }
    //crear imagen
    public save(imagen: FormData): Observable<any> {
        return this.httpClient.post<ImageProfile>(this.imageURL + 'upload', imagen); //si no enviara nada en el request body iria {} vacías
    }
    //actualizar imagen
    public update(id: number, imagen: FormData): Observable<any> {
        return this.httpClient.put<ImageProfile>(this.imageURL + `update/${id}`, imagen); //si no enviara nada en el request body iria {} vacías
    }
}