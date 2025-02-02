import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Miembro } from '../miembro/miembro.service';
import { Viaje } from '../viaje/viaje.service';


export interface Barco {
  matricula: string;
  nombre: string;
  amarre: number;
  tarifa: number;
  propietario?: Miembro;
}

@Injectable({
  providedIn: 'root'
})

export class BarcoService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  findAllBarcos(): Observable<Barco[]> {
    return this.http.get<Barco[]>(`${this.apiUrl}/findAllBarcos`)
      .pipe(catchError(this.handleError));
  }

  // Obtener un barco por matrícula
  findBarcoById(matricula: string): Observable<Barco> {
    return this.http.get<Barco>(`${this.apiUrl}/findBarcoById/${matricula}`)
      .pipe(catchError(this.handleError));
  }

  // Guardar un barco
  saveBarco(barco: Barco): Observable<Barco> {
    return this.http.post<Barco>(`${this.apiUrl}/saveBarco`, barco)
      .pipe(catchError(this.handleError));
  }

  // Actualizar un barco
  updateBarco(barco: Barco): Observable<Barco> {
    return this.http.put<Barco>(`${this.apiUrl}/updateBarco/${barco.matricula}`,barco)
      .pipe(catchError(this.handleError));
  }

  // Eliminar un barco
  deleteBarco(matricula: string): Observable<Barco> {
    return this.http.delete<Barco>(`${this.apiUrl}/deleteBarco/${matricula}`)
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 404) {
        errorMessage = 'Barco no encontrado';
      } else if (error.status === 409) {
        errorMessage = 'Barco duplicado';
      } else {
        errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
