import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String = ''
  password: String = ''

  constructor(
    private _authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    // Implémentez toute logique d'initialisation ici si nécessaire
  }
  
  login() {
    this._authService.login(this.email, this.password).subscribe(data =>{
      localStorage.setItem('UserToken', data.toString());

      this.router.navigate(['/pokemons']);
    })
  }
}
