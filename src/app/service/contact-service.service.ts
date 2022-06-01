import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactURL = environment.contactURL;

  constructor(private httpClient: HttpClient) { }

  //lista de contactos
  public lista(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.contactURL + 'lista')
  }
  //contacto por id
  public detail(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(this.contactURL + `detail/${id}`)
  }
  //contacto por email
  public detailemail(email: string): Observable<Contact> {
    return this.httpClient.get<Contact>(this.contactURL + `detailemail/${email}`)
  }
  //crear contacto
  public save(contacto: Contact): Observable<any> {
    return this.httpClient.post<Contact>(this.contactURL + 'create', contacto); //si no enviara nada en el request body iria {} vacías
  }
  //actualizar contacto
  public update(id: number, contacto: Contact): Observable<any> {
    return this.httpClient.put<Contact>(this.contactURL + `update/${id}`, contacto); //si no enviara nada en el request body iria {} vacías
  }
  //eliminar contacto
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<Contact>(this.contactURL + `delete/${id}`);
  }
}
