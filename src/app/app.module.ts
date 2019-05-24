import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EquiposComponent } from './equipos/equipos.component';
import { NuevoEquipoComponent } from './nuevo-equipo/nuevo-equipo.component';
import {RouterModule,Routes} from '@angular/router';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { NuevoJugadorComponent } from './nuevo-jugador/nuevo-jugador.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  {path:'',redirectTo:'/equipos',pathMatch:'full'},
  {path:'equipos', component:EquiposComponent},
  {path:'jugadores',component:JugadoresComponent},
  {path:'nuevoEquipo',component:NuevoEquipoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EquiposComponent,
    NuevoEquipoComponent,
    JugadoresComponent,
    NuevoJugadorComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
