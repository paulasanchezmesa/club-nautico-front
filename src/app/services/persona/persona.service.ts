import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

export interface Persona {
  dni: string;
  nombre: string;
  apellidos: string;
  telefono: number;
  direccion: string;
  esPatron: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService:AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found'); 
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  findAllPersonas(headers: HttpHeaders): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}/findAllPersonas`, { headers: this.getHeaders() });
  }

  findPersonaById(dni: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/findPersonaById/${dni}`,{ headers: this.getHeaders() });
  }

  savePersonas(persona: Persona): Observable<any> {
    return this.http.post(`${this.apiUrl}/savePersonas`, persona,{ headers: this.getHeaders() });
  }

  updatePersonas(persona: Persona): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatePersonas/${persona.dni}`, persona, { headers: this.getHeaders() });
  }

  deletePersonas(dni: string): Observable<any> {

    return this.http.delete(`${this.apiUrl}/deletePersonas/${dni}`,{ headers: this.getHeaders() });
  }
}
