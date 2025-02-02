import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Persona, PersonaService } from '../../../services/persona/persona.service';


@Component({
  selector: 'app-persona-edit',
  templateUrl: './persona-edit.component.html',
  standalone: false,
  styleUrls: ['./persona-edit.component.css']
})
export class PersonaEditComponent implements OnInit {
  persona: Persona = {
    dni: '',
    nombre: '',
    apellidos: '',
    telefono: 0,
    direccion: '',
    esPatron: false};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personaService: PersonaService
  ) {}

  errorMessage: string = '';

  ngOnInit(): void {
    const dni = this.route.snapshot.paramMap.get('dni');
    if (dni) {
      this.personaService.findPersonaById(dni).subscribe((data: Persona) => {
        this.persona = data;
      });
    }
  }

  actualizarPersona(): void {
    this.personaService.updatePersonas(this.persona).subscribe(() => {
      this.router.navigate(['/persona']);
    });
  }

  navigateToPersonas(): void {

    this.router.navigate(['/persona']);

  }

}