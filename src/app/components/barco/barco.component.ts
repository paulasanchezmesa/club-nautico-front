 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Barco, BarcoService } from '../../services/barco/barco.service';
import { Miembro } from '../../services/miembro/miembro.service';

@Component({
  selector: 'app-barco',
  templateUrl: './barco.component.html',
  standalone: false,
  styleUrls: ['./barco.component.css']
})
export class BarcoComponent implements OnInit {
  barcos: Barco[] = [];
  barco: Barco | null = null;
  searchMatricula: string = '';
  nuevoBarco: Barco = {
    matricula: '',
    nombre: '',
    amarre: 0,
    tarifa: 0,
    propietario: {} as Miembro, 

  };
  errorMessage: string = '';
  isEdit: boolean = false;

  constructor(
    private barcoService: BarcoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Cargar todos los barcos al iniciar el componente
    this.getBarcos();

    // Verificar si estamos en la vista de edición
    const matricula = this.route.snapshot.paramMap.get('matricula');
    if (matricula) {
      this.buscarBarco();
      this.isEdit = true;
    }
  }

  // Obtener todos los barcos
  getBarcos(): void {
    this.barcoService.findAllBarcos().subscribe(
      (barcos) => {
        this.barcos = barcos;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  buscarBarco(): void {
    if (this.searchMatricula.trim()) {
      this.barcoService.findBarcoById(this.searchMatricula).subscribe({
        next: (data) => {
          this.barcos = [data];
        },
        error: (error) => {
          if (error.status == 404) {
            this.errorMessage = 'No se ha encontrado el barco con matrícula ' + this.searchMatricula;
          }
          this.barcos = [];
        }
      });
    } else {
      this.getBarcos();
    }
  }

  saveBarco(): void {
    this.router.navigate(['/barco/crear']);
  }


  // Actualizar un barco
  updateBarco(matricula: string): void {
    this.router.navigate(['/barco/editar', matricula]);

  }

  // Eliminar un barco
  deleteBarco(matricula: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este barco?')) {
      this.barcoService.deleteBarco(matricula).subscribe(
        () => {
          this.barcos = this.barcos.filter(barco => barco.matricula !== matricula); // Filtrar el barco eliminado
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
