import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL

  optionRequete = {
    headers: new HttpHeaders({ 
      'Content-type': 'application/json'
  }), responseType: 'text' as 'json'
  }
  constructor(
    private http: HttpClient
  ) { }

    login(email: String, password: String){
      return this.http.post(`${this.API_URL}/users/login`, {email: email, password: password}, this.optionRequete )
    }

    register(name: String, email: String, password: String){
      return this.http.post(`${this.API_URL}/register`, {name: name, email: email, password: password}, this.optionRequete )
    }
}
