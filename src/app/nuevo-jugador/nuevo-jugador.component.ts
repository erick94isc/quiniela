import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';

@Component({
  selector: 'app-nuevo-jugador',
  templateUrl: './nuevo-jugador.component.html',
  styleUrls: ['./nuevo-jugador.component.css']
})
export class NuevoJugadorComponent implements OnInit {

	jugador :Jugador={id:0,nombre:'Nicole',apellido:'Rosas',fecha_nacimiento:23,posicion:'Delantero',numero:2,telefono:999999,goles:10,tarjetas_amarillas:0,tarjetas_rojas:1};
  constructor() {
  	
   }

  ngOnInit() {
  }

}
