import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegisterInterface } from '../../interfaces/RegisterInterface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/api';


  constructor(private http: HttpClient) { }

  public register (usu: RegisterInterface): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, usu);
  }
}
