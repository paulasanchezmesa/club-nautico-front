import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/authenticate';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private router: Router, private http: HttpClient) {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      this.tokenSubject = new BehaviorSubject<string | null>(token);
    } else { this.tokenSubject = new BehaviorSubject<string | null>(null); }
  }

  getToken(): string | null { return this.isBrowser() ? localStorage.getItem("token") : null; }

  private isBrowser(): boolean { return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'; }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    // Realizar la solicitud POST al backend para autenticar al usuario
    return this.http.post<any>(this.apiUrl, body);
  }

  logout(): void {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null; // Verificar si hay un token en localStorage
  }
}