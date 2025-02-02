import { Component, OnInit } from '@angular/core';
import { Persona, PersonaService } from '../../services/persona/persona.service';
import { AuthService } from '../../services/login/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  standalone: false
})
export class PersonaComponent implements OnInit {
  personas: Persona[] = [];
  searchDni: string = '';
  personaSeleccionada: Persona | null = null;
  loggedIn: boolean = false;
  constructor(private personaService: PersonaService, private authService: AuthService, private router: Router) { }

  errorMessage: string = '';


  ngOnInit(): void {
    this.obtenerPersonas();
    this.loggedIn = this.authService.isLoggedIn();
  }

  obtenerPersonas(): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.personaService.findAllPersonas(headers).subscribe(data => {
      this.personas = data;
    });
  }

  buscarPersona(): void {
    if (this.searchDni.trim()) {
      this.personaService.findPersonaById(this.searchDni).subscribe({
        next: (data) => {
          this.personas = [data];
        },
        error: (error) => {
          if (error.status == 404) {
            this.errorMessage = 'No se ha encontrado la persona con DNI ' + this.searchDni;
          }
          this.personas = [];
        }
      });
    } else {
      this.obtenerPersonas();
    }
  }

  eliminarPersona(dni: string): void {
    if (this.loggedIn) {
      this.personaService.deletePersonas(dni).subscribe({
        next: () => {
          this.obtenerPersonas();
        },
        error: (error) => {
          console.error('Error al eliminar persona:', error);
        }
      });
    }
  }

  editarPersona(dni: string): void {
    this.router.navigate(['/persona/editar', dni]);
  }

  crearPersona(): void {
    this.router.navigate(['/persona/crear']);

  }

}
