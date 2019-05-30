import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

 jugadores:Jugador[];
  constructor() { }

  ngOnInit() {
  }

}
