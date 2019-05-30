import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';
import {Equipo} from '../Model/equipo';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  jugadores:Jugador[];
  equipos : Equipo[]= [ { "id": 0, "nombre": "Falsos" },{ "id": 1, "nombre": "Cuervos de nuevo toledo" },];
  constructor() { }

  ngOnInit() {
  }

}
