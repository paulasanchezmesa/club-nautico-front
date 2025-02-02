import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Barco, BarcoService } from '../../../services/barco/barco.service';
import { Miembro } from '../../../services/miembro/miembro.service';


@Component({
  selector: 'app-barco-edit',
  templateUrl: './barco-edit.component.html',
  standalone: false,
  styleUrls: ['./barco-edit.component.css']
})
export class BarcoEditComponent implements OnInit {
  barco: Barco = {
    matricula: '',
    nombre: '',
    amarre: 0,
    tarifa: 0,
    propietario: null as unknown as Miembro
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private barcoService: BarcoService
  ) { }

  ngOnInit(): void {
    const matricula = this.route.snapshot.paramMap.get('matricula');
    if (matricula) {
      this.barcoService.findBarcoById(matricula).subscribe((data: Barco) => {
        this.barco = {
          matricula: data.matricula,
          nombre: data.nombre,
          amarre: data.amarre,
          tarifa: data.tarifa
        };
      });
    }
  }

  actualizarBarco(): void {
    console.log('Datos del barco antes de actualizar:', this.barco);
    this.barcoService.updateBarco(this.barco).subscribe({
      next: () => {
        console.log('Barco actualizado con éxito');
        this.router.navigate(['/barco']);
      },
      error: (error) => {
        console.error('Error al actualizar barco:', error);
      }
    });
  }

  navigateToBarcos(): void {
    this.router.navigate(['/barco']);
  }
}