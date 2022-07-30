import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ImageProject } from "../models/imageProject";

@Injectable({
    providedIn: 'root'
})

export class ImageProjectService{

    imgURL = environment.imageProjectURL;

    constructor(private httpClient: HttpClient) { }

    public lista(): Observable<ImageProject[]>{
        return this.httpClient.get<ImageProject[]>(this.imgURL + 'lista')
      }
}
