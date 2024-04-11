import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(
    private router: Router
  ) {
    this.logout();
  }

  logout(): void {
    // Placez ici tout le code de déconnexion nécessaire

    // Après la déconnexion, naviguez vers la page d'accueil
    this.router.navigate(['/']);
  }
}