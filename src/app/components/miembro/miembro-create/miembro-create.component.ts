import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Miembro, MiembroService } from '../../../services/miembro/miembro.service';
import { Persona, PersonaService } from '../../../services/persona/persona.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-miembro-create',
  standalone: false,
  templateUrl: './miembro-create.component.html',
  styleUrls: ['./miembro-create.component.css']
})
export class MiembroCreateComponent implements OnInit {
  miembro: Miembro = {
    id: 0,
    persona: {} as Persona,
    barcos: []
  };
  personas: Persona[] = [];
  miembros: Miembro[] = [];
  personasNoMiembros: Persona[] = [];
  errorMessage: string = '';

  constructor(
    private router: Router,
    private miembroService: MiembroService,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    const headers = new HttpHeaders(); // Create HttpHeaders instance
    this.personaService.findAllPersonas(headers).subscribe((data: Persona[]) => {
      this.personas = data;
      this.filterPersonasNoMiembros();
    });

    this.miembroService.findAllMiembros().subscribe((data: Miembro[]) => {
      this.miembros = data;
      this.filterPersonasNoMiembros();
    });
  }

  filterPersonasNoMiembros(): void {
    if (this.personas.length > 0 && this.miembros.length > 0) {
      const miembrosDni = this.miembros.map(miembro => miembro.persona.dni);
      this.personasNoMiembros = this.personas.filter(persona => !miembrosDni.includes(persona.dni));
    }
  }

  saveMiembro(): void {
    this.miembroService.saveMiembro(this.miembro).subscribe(() => {
      this.router.navigate(['/miembro']);
    }, error => {
      this.errorMessage = 'Error al guardar el miembro: ' + error.message;
    });
  }

  cancelar(): void {
    this.router.navigate(['/miembro']);
  }
}