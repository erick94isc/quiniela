import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

 jugadores:Jugador[]=[{id:0,nombre:'Martin',apellido:'Gonzalez',fecha_nacimiento:27,posicion:'Delantero',numero:2,telefono:999999,goles:10,tarjetas_amarillas:0,tarjetas_rojas:1}, {id:0,nombre:'Martin',apellido:'Gonzalez',fecha_nacimiento:27,posicion:'delantero',numero:2,telefono:999999,goles:10,tarjetas_amarillas:0,tarjetas_rojas:1}];
 private idEquipo;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
  	this.idEquipo = this.route.snapshot.paramMap.get('id');
  }

}
