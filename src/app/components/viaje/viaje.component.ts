import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Viaje, ViajeService } from '../../services/viaje/viaje.service';
import { Persona, PersonaService } from '../../services/persona/persona.service';
import { Barco, BarcoService } from '../../services/barco/barco.service';


@Component({
  selector: 'app-viaje',
  standalone: false,
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {
  viajes: Viaje[] = [];
  viaje: Viaje | null = null;
  searchId: number = 0;
  nuevoViaje: Viaje = {
    id: 0,
    fechaHora: new Date(),
    descripcion: '',
    organizador: {} as Persona,
    barco: {} as Barco
  };
  errorMessage: string = '';
  isEdit: boolean = false;

  constructor(
    private viajeService: ViajeService,
    private personaService: PersonaService,
    private barcoService: BarcoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Cargar todos los viajes al iniciar el componente
    this.getViajes();

    // Verificar si estamos en la vista de edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buscarViaje();
      this.isEdit = true;
    }
  }

  // Obtener todos los viajes
  getViajes(): void {
    this.viajeService.getAllViajes().subscribe(
      (viajes) => {
        this.viajes = viajes;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  buscarViaje(): void {
    if (this.searchId) {
      this.viajeService.getViajeById(this.searchId).subscribe({
        next: (data) => {
          this.viajes = [data];
        },
        error: (error) => {
          console.error('Error al buscar viaje:', error);
          this.viajes = [];
        }
      });
    } else {
      this.getViajes();
    }
  }

  saveViaje(): void {
    this.router.navigate(['/viaje/crear']);
  }

  // Actualizar un viaje
  updateViaje(id: number): void {
    this.router.navigate(['/viaje/editar', id]);
  }

  // Eliminar un viaje
  deleteViaje(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este viaje?')) {
      this.viajeService.deleteViaje(id).subscribe(
        () => {
          this.viajes = this.viajes.filter(viaje => viaje.id !== id); // Filtrar el viaje eliminado
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}