import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/persona'

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

  personaURL = environment.personaURL;

  constructor(private httpClient: HttpClient) { }

  //lista de personas
  public lista(): Observable<Persona[]>{
    return this.httpClient.get<Persona[]>(this.personaURL + 'lista')
  }
  //persona por id
  public detail(id:number): Observable<Persona>{
    return this.httpClient.get<Persona>(this.personaURL + `detail/${id}`)
  }
  //persona por apellido
  public detailname(nombre:string): Observable<Persona>{
    return this.httpClient.get<Persona>(this.personaURL + `detailname/${nombre}`)
  }
  //persona por contacto id
  public getAllPersonasByContacto(id:number):Observable<Persona>{
    return this.httpClient.get<Persona>(this.personaURL + `contacto/${id}`)
  }
  //crear persona
  public save(persona:Persona):Observable<any>{
    return this.httpClient.post<Persona>(this.personaURL + 'create', persona); //si no enviara nada en el request body iria {} vacías
  }
  //crear persona con id contacto
  public create(id:number,persona:Persona):Observable<any>{
    return this.httpClient.post<Persona>(this.personaURL + `create/${id}`, persona)
  }
  //actualizar persona
  public update(id: number, persona:Persona):Observable<any>{
    return this.httpClient.put<Persona>(this.personaURL + `update/${id}`, persona); //si no enviara nada en el request body iria {} vacías
  }
  //eliminar pesona
  public delete(id:number):Observable<any>{
    return this.httpClient.delete<Persona>(this.personaURL + `delete/${id}`);
  }
}
