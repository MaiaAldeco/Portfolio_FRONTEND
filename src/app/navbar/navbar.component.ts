import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged = false;

  constructor(private tokenService:TokenService,
    private router:Router) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
  }

  onLogOut(): void{
    this.tokenService.logOut(); 
  }
}
