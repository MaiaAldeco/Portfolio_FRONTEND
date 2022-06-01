import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projects } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsServiceService {

  projectURL = environment.projectURL;

  constructor(private httpClient: HttpClient) { }

    //lista de trabajos
    public lista(): Observable<Projects[]> {
      return this.httpClient.get<Projects[]>(this.projectURL + 'lista')
    }
    //trabajos por id
    public detail(id: number): Observable<Projects> {
      return this.httpClient.get<Projects>(this.projectURL + `detail/${id}`)
    }
    //trabajo por titulo
    public detailname(titulo: string): Observable<Projects> {
      return this.httpClient.get<Projects>(this.projectURL + `detailname/${titulo}`)
    }
    //trabajo por persona id
    public getAllTrabajosByPersona(id: number): Observable<Projects> {
      return this.httpClient.get<Projects>(this.projectURL + `persona/${id}`)
    }
    //crear trabajo
    public save(trabajo: Projects): Observable<any> {
      return this.httpClient.post<Projects>(this.projectURL + 'create', trabajo); //si no enviara nada en el request body iria {} vacías
    }
    //crear trabajo con id persona
    public create(id: number, trabajo: Projects): Observable<any> {
      return this.httpClient.post<Projects>(this.projectURL + `create/${id}`, trabajo)
    }
    //actualizar trabajo
    public update(id: number, trabajo: Projects): Observable<any> {
      return this.httpClient.put<Projects>(this.projectURL + `update/${id}`, trabajo); //si no enviara nada en el request body iria {} vacías
    }
    //eliminar trabajo
    public delete(id: number): Observable<any> {
      return this.httpClient.delete<Projects>(this.projectURL + `delete/${id}`);
    }
    //eliminar persona de trabajo
    public deleteAllProjectsDePersona(id: number): Observable<any> {
      return this.httpClient.delete<Projects>(this.projectURL + `delete/${id}/trabajo`);
    }
}
