import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        PersonaComponent,
        HomeComponent,
        PersonaCreateComponent,
        PersonaEditComponent,
        BarcoComponent,
        BarcoCreateComponent,
        BarcoEditComponent,
        MiembroComponent,
        MiembroCreateComponent,
        ViajeComponent,
        ViajeCreateComponent,
        ViajeEditComponent

    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule],
        
        
        providers: [
            
            provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }