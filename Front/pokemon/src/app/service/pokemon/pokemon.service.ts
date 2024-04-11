import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private API_URL = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }
  getPokemons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/pokemon`);
  } 

  getPokemonById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/pokemon/${id}`);
  } 
}
