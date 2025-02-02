import { Component } from '@angular/core';
import { Persona, PersonaService } from '../../../services/persona/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persona-create',
  standalone: false,

  templateUrl: './persona-create.component.html',
  styleUrl: './persona-create.component.css'
})
export class PersonaCreateComponent {

  persona: Persona = {
    dni: '', nombre: '', apellidos: '', telefono: 0,
    direccion: '', esPatron: false
  };

  errorMessage: string = '';

  constructor(private personaService: PersonaService, private router: Router) { }

  guardarPersona(): void {
    this.personaService.savePersonas(this.persona).subscribe(() => {
      this.router.navigate(['/persona']);
    }, error => {
      if (error.status == 500) {
        this.errorMessage = 'Error al guardar la persona: ' + 'DNI inválido';
      } else if (error.status == 409) {
        this.errorMessage = 'Error al guardar la persona: ' + 'El DNI ya existe';
      } else {
        this.errorMessage = 'Error al guardar la persona: ' + 'Error en el servidor';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/persona']);
  }
}
