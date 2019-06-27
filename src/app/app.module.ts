import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';

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
import { RegistroComponent } from './registro/registro.component';
import { PartidosComponent } from './partidos/partidos.component';
import { NuevopartidoComponent } from './nuevopartido/nuevopartido.component';
import { PartidoComponent } from './partidos/partido/partido.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'equipos', component:EquiposComponent,canActivate: [AuthGuard] },
  {path:'jugadores/:id',component:JugadoresComponent,canActivate: [AuthGuard]},
  {path:'nuevoEquipo/:id',component:NuevoEquipoComponent,canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'nuevoJugador/:id/:action',component:NuevoJugadorComponent,canActivate: [AuthGuard]},
  {path:'nuevoTorneo/:id',component:NuevoTorneoComponent,canActivate: [AuthGuard]},
  {path:'torneo', component:TorneoComponent,canActivate: [AuthGuard]},
  {path:'usuario/:id',component:RegistroComponent,canActivate: [AuthGuard]},
  {path:'nuevoPartido/:id', component:NuevopartidoComponent,canActivate: [AuthGuard]}, 
  {path:'partidos/:id', component:PartidosComponent,canActivate: [AuthGuard]}
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
    RegistroComponent,
    PartidosComponent,
    NuevopartidoComponent,
    PartidoComponent
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
