import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../persona/persona.service';
import { Barco } from '../barco/barco.service';
import { Observable } from 'rxjs';

export interface Miembro {
  id: number;
  persona: Persona; 
  barcos: Barco[];  
  
}


@Injectable({
  providedIn: 'root'
})


export class MiembroService {

   private apiUrl = 'http://localhost:8080/api';
 
   constructor(private http: HttpClient) { }

  // Obtener todos los miembros
  findAllMiembros(): Observable<Miembro[]> {
    return this.http.get<Miembro[]>(`${this.apiUrl}/findAllMiembros`);
  }

  // Obtener un miembro por ID
  findMiembroById(id: number): Observable<Miembro> {
    return this.http.get<Miembro>(`${this.apiUrl}/findMiembroById/${id}`);
  }

  // Obtener barcos de un miembro por su ID
  findAllMiembroBarcos(id: number): Observable<Barco[]> {
    return this.http.get<Barco[]>(`${this.apiUrl}/findAllMiembroBarcos/${id}`);
  }

  // Crear un nuevo miembro
  saveMiembro(miembro: Miembro): Observable<Miembro> {
    return this.http.post<Miembro>(`${this.apiUrl}/saveMiembro`, miembro);
  }

  // Actualizar un miembro por ID
  updateMiembro(id: number, miembro: Miembro): Observable<Miembro> {
    return this.http.put<Miembro>(`${this.apiUrl}/updateMiembro/${id}`, miembro);
  }

  // Eliminar un miembro por ID
  deleteMiembro(id: number): Observable<Miembro> {
    return this.http.delete<Miembro>(`${this.apiUrl}/deleteMiembro/${id}`);
  }
}
