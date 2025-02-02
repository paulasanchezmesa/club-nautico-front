import { Component } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { RegisterInterface } from '../../interfaces/RegisterInterface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent {
  usuario: RegisterInterface = {
    email: '',
    password: '',
    dni: '',
    nombre: '',
    apellidos: '',
    telefono: 0,
    direccion: '',
    role: 'USER'
  };

  // Variable para manejar errores
  errorMessage: string | null = null;

  constructor(private registerService: RegisterService) { }

  registrarUsuario() {
    console.log('Usuario a registrar', this.usuario);
    this.registerService.register(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito', response);
        this.errorMessage = null; // Reseteamos el mensaje de error
      },
      error: (error) => {
        console.error('Error al registrar el usuario', error);
        this.errorMessage = 'Error al registrar el usuario. Por favor, intente de nuevo más tarde.';
      }
    });
  }
}
