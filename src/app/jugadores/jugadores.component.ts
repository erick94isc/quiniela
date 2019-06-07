import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';
import {ActivatedRoute} from '@angular/router';
import {JugadorService} from '../service/jugador.service';


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
  	this.jugadores = await this.service.getJugadores().toPromise();
  }

}
