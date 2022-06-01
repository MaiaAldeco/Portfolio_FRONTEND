import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceServiceService {

  experienciaURL = environment.experienciaURL;

  constructor(private httpClient: HttpClient) { }

  //lista de experiencias
  public lista(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(this.experienciaURL + 'lista')
  }
  //experiencia por id
  public detail(id: number): Observable<Experience> {
    return this.httpClient.get<Experience>(this.experienciaURL + `detail/${id}`)
  }
  //experiencia por nombre
  public detailname(nombre: string): Observable<Experience> {
    return this.httpClient.get<Experience>(this.experienciaURL + `detailname/${nombre}`)
  }
  //experiencia por persona id
  public getAllExperienciasByPersona(id: number): Observable<Experience> {
    return this.httpClient.get<Experience>(this.experienciaURL + `persona/${id}`)
  }
  //crear experiencia
  public save(exp: Experience): Observable<any> {
    return this.httpClient.post<Experience>(this.experienciaURL + 'create', exp); //si no enviara nada en el request body iria {} vacías
  }
  //crear experiencia con id persona
  public create(id: number, exp: Experience): Observable<any> {
    return this.httpClient.post<Experience>(this.experienciaURL + `create/${id}`, exp)
  }
  //actualizar experiencia
  public update(id: number, exp: Experience): Observable<any> {
    return this.httpClient.put<Experience>(this.experienciaURL + `update/${id}`, exp); //si no enviara nada en el request body iria {} vacías
  }
  //eliminar experiencia
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<Experience>(this.experienciaURL + `delete/${id}`);
  }
  //eliminar persona de trabajos
  public deleteAllExperienciaDePersona(id: number): Observable<any> {
    return this.httpClient.delete<Experience>(this.experienciaURL + `delete/${id}/persona`);
  }
}
