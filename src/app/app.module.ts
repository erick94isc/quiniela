import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EquiposComponent } from './equipos/equipos.component';
import { NuevoEquipoComponent } from './nuevo-equipo/nuevo-equipo.component';
import {RouterModule,Routes} from '@angular/router';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { NuevoJugadorComponent } from './nuevo-jugador/nuevo-jugador.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { EquipoComponent } from './equipos/equipo/equipo.component';
import { JugadorComponent } from './jugadores/jugador/jugador.component';
import { TorneoComponent } from './torneo/torneo.component';
import { DatePipe } from '@angular/common'
import { ColorPickerModule } from 'ngx-color-picker';
import { NuevoTorneoComponent } from './nuevo-torneo/nuevo-torneo.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'equipos', component:EquiposComponent},
  {path:'jugadores/:id',component:JugadoresComponent},
  {path:'nuevoEquipo',component:NuevoEquipoComponent},
  {path:'login',component:LoginComponent},
  {path:'nuevoJugador/:id',component:NuevoJugadorComponent},
  {path:'nuevoTorneo',component:NuevoTorneoComponent},
  {path:'torneo', component:TorneoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EquiposComponent,
    NuevoEquipoComponent,
    JugadoresComponent, 
    NuevoJugadorComponent,
    HeaderComponent,
    LoginComponent,
    EquipoComponent,
    JugadorComponent,
    TorneoComponent,
    NuevoTorneoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ColorPickerModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
