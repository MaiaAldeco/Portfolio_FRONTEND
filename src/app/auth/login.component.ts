import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  errorMsj: string;

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe({
      next: (v) => {
        this.tokenService.setToken(v.token);   
        this.toastr.success(this.errorMsj, 'Bienvenido ' + this.tokenService.getUsername(), {
          timeOut: 3000, positionClass: 'toast-top-center'
        })
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.log(e)
        this.errorMsj = e.error.message;
        this.toastr.error(this.errorMsj, 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-center'
        })
      }
    })
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }
}
