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
import { PartidosComponent } from './partidos/partidos.component';
import { NuevopartidoComponent } from './nuevopartido/nuevopartido.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'equipos', component:EquiposComponent},
  {path:'jugadores/:id',component:JugadoresComponent},
  {path:'nuevoEquipo/:id',component:NuevoEquipoComponent},
  {path:'login',component:LoginComponent},
  {path:'nuevoJugador/:id/:action',component:NuevoJugadorComponent},
  {path:'nuevoTorneo/:id',component:NuevoTorneoComponent},
  {path:'torneo', component:TorneoComponent}, 
  {path:'nuevoPartido', component:NuevopartidoComponent}, 
  {path:'partido', component:PartidosComponent}
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
    NuevoTorneoComponent,
    PartidosComponent,
    NuevopartidoComponent
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
