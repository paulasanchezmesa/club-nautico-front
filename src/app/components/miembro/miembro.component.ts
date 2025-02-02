import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Miembro, MiembroService } from '../../services/miembro/miembro.service';
import { Persona } from '../../services/persona/persona.service';
import { Barco } from '../../services/barco/barco.service';


@Component({
  selector: 'app-miembro',
  templateUrl: './miembro.component.html',
  standalone: false,
  styleUrls: ['./miembro.component.css']
})
export class MiembroComponent implements OnInit {
  miembros: Miembro[] = [];
  miembro: Miembro | null = null;
  searchId: number = 0;
  nuevoMiembro: Miembro = {
    id: 0,
    persona: {} as Persona,
    barcos: [] as Barco[]
  };
  errorMessage: string = '';
  isEdit: boolean = false;

  constructor(
    private miembroService: MiembroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Cargar todos los miembros al iniciar el componente
    this.getMiembros();

    // Verificar si estamos en la vista de edición
    const dni = this.route.snapshot.paramMap.get('dni');
    if (dni) {
      this.buscarMiembro();
      this.isEdit = true;
    }
  }

  // Obtener todos los miembros
  getMiembros(): void {
    this.miembroService.findAllMiembros().subscribe(
      (miembros) => {
        this.miembros = miembros;
      }
    );
  }

  buscarMiembro(): void {
    if (this.searchId) {
      this.miembroService.findMiembroById(this.searchId).subscribe({
        next: (data) => {
          this.miembros = [data];
        },
        error: (error) => {
          if (error.status == 404) {
            this.errorMessage = 'No se ha encontrado el miembro con ID ' + this.searchId;
          }
          this.miembros = [];
        }
      });
    } else {
      this.getMiembros();
    }
  }

  saveMiembro(): void {
    this.router.navigate(['/miembro/crear']);
  }

  // Actualizar un miembro
  updateMiembro(id: number): void {
    this.router.navigate(['/miembro/editar', id]);
  }

  // Eliminar un miembro
  deleteMiembro(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este miembro?')) {
      this.miembroService.deleteMiembro(id).subscribe(
        () => {
          this.miembros = this.miembros.filter(miembro => miembro.id !== id); 
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }
}