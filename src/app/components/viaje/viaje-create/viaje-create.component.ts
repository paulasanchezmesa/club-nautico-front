import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Viaje, ViajeService } from '../../../services/viaje/viaje.service';
import { Persona, PersonaService } from '../../../services/persona/persona.service';
import { Barco, BarcoService } from '../../../services/barco/barco.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-viaje-create',
  standalone: false,
  templateUrl: './viaje-create.component.html',
  styleUrls: ['./viaje-create.component.css']
})
export class ViajeCreateComponent implements OnInit {
  viaje: Viaje = {
    id: 0,
    fechaHora: new Date(),
    descripcion: '',
    organizador: {} as Persona,
    barco: {} as Barco
  };

  personas: Persona[] = [];
  barcos: Barco[] = [];
  errorMessage: string = '';

  constructor(
    private viajeService: ViajeService,
    private router: Router,
    private personaService: PersonaService,
    private barcoService: BarcoService
  ) { }

  ngOnInit(): void {
    const headers = new HttpHeaders();
    this.personaService.findAllPersonas(headers).subscribe((data: Persona[]) => {
      this.personas = data;
    });

    this.barcoService.findAllBarcos().subscribe((data: Barco[]) => {
      this.barcos = data;
    });
  }

  saveViaje(): void {
    console.log('Datos del viaje antes de guardar:', this.viaje);

    this.viajeService.createViaje(this.viaje).subscribe(() => {
      console.log('Viaje creado con éxito');
      this.router.navigate(['/viaje']);
    }, error => {
      console.error('Error al crear el viaje:', error);
      if (error.status === 400) {
        this.errorMessage = 'Datos inválidos';
      } else if (error.status === 500) {
        this.errorMessage = 'Error del servidor';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/viaje']);
  }
}