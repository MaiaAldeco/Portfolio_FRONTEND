import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skills } from '../models/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsServiceService {

  skillsURL = environment.skillsURL;

  constructor(private httpClient: HttpClient) { }

  //lista de habilidades
  public lista(): Observable<Skills[]> {
    return this.httpClient.get<Skills[]>(this.skillsURL + 'lista')
  }
  //habilidades por id
  public detail(id: number): Observable<Skills> {
    return this.httpClient.get<Skills>(this.skillsURL + `detail/${id}`)
  }
  //habilidades por nombre
  public detailname(nombre: string): Observable<Skills> {
    return this.httpClient.get<Skills>(this.skillsURL + `detailname/${nombre}`)
  }
  //habilidades por persona id
  public getAllHabilidadesByPersona(id: number): Observable<Skills> {
    return this.httpClient.get<Skills>(this.skillsURL + `persona/${id}`)
  }
  //crear habilidad
  public save(skill: Skills): Observable<any> {
    return this.httpClient.post<Skills>(this.skillsURL + 'create', skill); //si no enviara nada en el request body iria {} vacías
  }
  //crear habilidad con id persona
  public create(id: number, trabajo: Skills): Observable<any> {
    return this.httpClient.post<Skills>(this.skillsURL + `create/${id}`, trabajo)
  }
  //actualizar habilidad
  public update(id: number, skill: Skills): Observable<any> {
    return this.httpClient.put<Skills>(this.skillsURL + `update/${id}`, skill); //si no enviara nada en el request body iria {} vacías
  }
  //eliminar habilidad
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<Skills>(this.skillsURL + `delete/${id}`);
  }
  //eliminar personas de habilidad
  public deleteAllExperienciaDePersona(id: number): Observable<any> {
    return this.httpClient.delete<Skills>(this.skillsURL + `delete/${id}/skill`);
  }
}
