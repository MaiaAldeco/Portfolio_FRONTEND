import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//VARIABLES ALMACENADAS EN EL NAVEGADOR
const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(private router: Router) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public getUsername(): string {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;
    return username;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
       return false;
    }
    const token = this.getToken(); //OBTENEMOS EL TOKEN
    const payload = token.split('.')[1]; //LO DIVIDIMOS Y GUARDAMOS LA PRIMER POSICIÓN
    const payloadDecoded = atob(payload); //DECODIFICAMOS EL TOKEN
    const values = JSON.parse(payloadDecoded); //SE PARSEA Y GUARDA EL VALOR
    const roles = values.roles; //OBTENEMOS LOS ROLES
    if(roles.indexOf('ROLE_ADMIN')<0){ //SI LA POSICIÓN ES -1 NO SE ENCUENTRA EN EL ARRAY
      return false;
    }
    return true;
  }

  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
