import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  errorMsj: string;
  isRegister = false;
  isRegisterFail = false;

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.create(this.nuevoUsuario).subscribe({
      next: (v) => {
        this.toastr.success('Cuenta creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); this.router.navigate(['/login'])
      },
      error: (e) => {
        this.errorMsj = e.error.mensaje;
        this.toastr.error(this.errorMsj, 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-center'
        })
      }
    })
  }

  onLogOut(): void{
    this.tokenService.logOut();
  }
}

