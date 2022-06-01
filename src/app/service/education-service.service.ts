import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationServiceService {

  educationURL = environment.educationURL;

  constructor(private httpClient: HttpClient) { }

    //lista de estudios
    public lista(): Observable<Education[]> {
      return this.httpClient.get<Education[]>(this.educationURL + 'lista')
    }
    //estudio por id
    public detail(id: number): Observable<Education> {
      return this.httpClient.get<Education>(this.educationURL + `detail/${id}`)
    }
    //estudio por nombre
    public detailname(nombre: string): Observable<Education> {
      return this.httpClient.get<Education>(this.educationURL + `detailname/${nombre}`)
    }
    //estudios por persona id
    public getAllEstudiosByPersona(id: number): Observable<Education> {
      return this.httpClient.get<Education>(this.educationURL + `persona/${id}`)
    }
    //crear estudio
    public save(estudio: Education): Observable<any> {
      return this.httpClient.post<Education>(this.educationURL + 'create', estudio); //si no enviara nada en el request body iria {} vacías
    }
    //crear estudio con id persona
    public create(id: number, estudio: Education): Observable<any> {
      return this.httpClient.post<Education>(this.educationURL + `create/${id}`, estudio)
    }
    //actualizar estudio
    public update(id: number, estudio: Education): Observable<any> {
      return this.httpClient.put<Education>(this.educationURL + `update/${id}`, estudio); //si no enviara nada en el request body iria {} vacías
    }
    //eliminar estudio
    public delete(id: number): Observable<any> {
      return this.httpClient.delete<Education>(this.educationURL + `delete/${id}`);
    }
    //eliminar persona de estudio
    public deleteAllExperienciaDePersona(id: number): Observable<any> {
      return this.httpClient.delete<Education>(this.educationURL + `delete/${id}/persona`);
    }
}
