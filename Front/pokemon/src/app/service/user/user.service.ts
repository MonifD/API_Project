import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les informations de l'utilisateur actuellement connecté
  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/me`);
  }
}