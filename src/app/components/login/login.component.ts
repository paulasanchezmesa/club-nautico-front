import { Component } from '@angular/core';
import { AuthService } from '../../services/login/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
  usuario = {
    email: '',
    password: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService,private router: Router) { }

  iniciarSesion(): void {
    this.authService.login(this.usuario.email, this.usuario.password).subscribe(
      (response) => {
        // Si la respuesta contiene el token
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Guardar el token JWT en localStorage
          console.log('Inicio de sesión exitoso, token:', response.token);
          this.errorMessage = '';
          // Redirigir al usuario a la página principal o a una página protegida
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
      }
    );
  }
}
