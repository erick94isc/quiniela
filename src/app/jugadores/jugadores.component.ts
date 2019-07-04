import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';
import {ActivatedRoute} from '@angular/router';
import {JugadorService} from '../service/jugador.service';
import {EquipoService} from '../service/equipo.service';



@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {

 jugadores:Jugador[];
 private idEquipo;

  constructor(private route:ActivatedRoute, private service:JugadorService) { }

  async ngOnInit() {
  	this.idEquipo = this.route.snapshot.paramMap.get('id');
  	let response = await this.service.getJugadores(this.idEquipo).toPromise();
  		if(response.code == 200){
 			this.jugadores = response.jugadores;
 		}
  }

}
