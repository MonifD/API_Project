import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String = ''
  email: String = ''
  password: String = ''

  constructor(
    private _authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    // Implémentez toute logique d'initialisation ici si nécessaire
  }

  register() {
    this._authService.register(this.name, this.email, this.password).subscribe(data =>{
      localStorage.setItem('UserToken', data.toString());

      this.router.navigate(['/pokemons']);
    })
  }
}