import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PersonaComponent } from './components/persona/persona.component';
import { HomeComponent } from './components/home/home.component'; 
import { PersonaCreateComponent } from './components/persona/persona-create/persona-create.component';
import { PersonaEditComponent } from './components/persona/persona-edit/persona-edit.component';
import { BarcoComponent } from './components/barco/barco.component';
import { BarcoCreateComponent } from './components/barco/barco-create/barco-create.component';
import { BarcoEditComponent } from './components/barco/barco-edit/barco-edit.component';
import { MiembroComponent } from './components/miembro/miembro.component';
import { MiembroCreateComponent } from './components/miembro/miembro-create/miembro-create.component';
import { ViajeComponent } from './components/viaje/viaje.component';
import { ViajeCreateComponent } from './components/viaje/viaje-create/viaje-create.component';
import { ViajeEditComponent } from './components/viaje/viaje-edit/viaje-edit.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path:'persona', component: PersonaComponent},
  {path: 'persona/crear', component: PersonaCreateComponent},
  {path: 'persona/editar/:dni', component: PersonaEditComponent},
  {path:'barco', component: BarcoComponent},
  {path: 'barco/crear', component: BarcoCreateComponent},
  {path: 'barco/editar/:matricula', component: BarcoEditComponent},
  {path: 'miembro', component: MiembroComponent},
  {path: 'miembro/crear', component: MiembroCreateComponent},
  {path: 'viaje', component: ViajeComponent},
  {path: 'viaje/crear', component: ViajeCreateComponent},
  {path: 'viaje/editar/:id', component: ViajeEditComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
