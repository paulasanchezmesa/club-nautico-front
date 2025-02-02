import { Component, OnInit } from '@angular/core';
import { Barco, BarcoService } from '../../../services/barco/barco.service';
import { Router } from '@angular/router';
import { Miembro, MiembroService } from '../../../services/miembro/miembro.service';

@Component({
  selector: 'app-barco-create',
  standalone: false,
  templateUrl: './barco-create.component.html',
  styleUrl: './barco-create.component.css'
})
export class BarcoCreateComponent implements OnInit {

  barco: Barco = {
    matricula: '', nombre: '', amarre: 0,
    tarifa: 0,
    propietario: {} as Miembro
  }

  miembros: Miembro[] = [];
  errorMessage: string = '';


  constructor(private barcoService: BarcoService, private router: Router, private miembroService: MiembroService) { }


  ngOnInit(): void {
    this.miembroService.findAllMiembros().subscribe((data: Miembro[]) => {
      this.miembros = data;
    });
  }

  saveBarco(): void {
    this.barcoService.saveBarco(this.barco).subscribe(() => {
      this.router.navigate(['/barco']);
    }, error => {
      if (error.status === 400) {
        this.errorMessage = 'La matrícula ya existe';
        
      }else if (error.status === 500) {
        this.errorMessage = 'La matrícula no puede estar vacía';
        
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/barco']);
  }
}
