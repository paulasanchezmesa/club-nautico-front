import { Component, OnInit } from '@angular/core';
import { Viaje, ViajeService } from '../../../services/viaje/viaje.service';
import { Persona, PersonaService } from '../../../services/persona/persona.service';
import { Barco, BarcoService } from '../../../services/barco/barco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-viaje-edit',
  standalone: false,
  templateUrl: './viaje-edit.component.html',
  styleUrl: './viaje-edit.component.css'
})
export class ViajeEditComponent implements OnInit {
  viaje: Viaje = {
    id: 0,
    fechaHora: new Date(),
    descripcion: ''
  };

  errorMessage: string = '';
  minDate: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viajeService: ViajeService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.viajeService.getViajeById(+id).subscribe((data: Viaje) => {
        this.viaje = {
          id: data.id,
          fechaHora: data.fechaHora,
          descripcion: data.descripcion
        };
      });
    }
  }

  actualizarViaje(): void {
    console.log('Datos del viaje antes de actualizar:', this.viaje);
    this.viajeService.updateViaje(this.viaje.id, this.viaje ).subscribe(() => {
      console.log('Viaje actualizado con éxito:', this.viaje);
      this.router.navigate(['/viaje']);
    }, error => {
      console.error('Error al actualizar viaje:', error);
    });
  }

  navigateToViajes(): void {
    this.router.navigate(['/viaje']);
  }

}
