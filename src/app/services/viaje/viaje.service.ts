import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';


export interface Viaje {
  id: number;
  fechaHora: Date; 
  descripcion: string;
  organizador?: { dni: string }; 
  barco?: { matricula: string }; 
}

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService:AuthService) { }
  // Obtener todos los viajes
  getAllViajes(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`${this.apiUrl}/findAllViajes`);
  }

  // Obtener un viaje por su ID
  getViajeById(id: number): Observable<Viaje> {
    return this.http.get<Viaje>(`${this.apiUrl}/findViajeById/${id}`);
  }

  // Crear un nuevo viaje
  createViaje(viaje: Viaje): Observable<Viaje> {
    return this.http.post<Viaje>(`${this.apiUrl}/saveViaje`, viaje);
  }

  // Actualizar un viaje existente
  updateViaje(id: number, viaje: Viaje): Observable<Viaje> {
    return this.http.put<Viaje>(`${this.apiUrl}/updateViaje/${id}`, viaje);
  }

  // Eliminar un viaje
  deleteViaje(id: number): Observable<Viaje> {
    return this.http.delete<Viaje>(`${this.apiUrl}/deleteViaje/${id}`);
  }
}
