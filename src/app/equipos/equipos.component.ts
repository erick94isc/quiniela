import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';
import {Equipo} from '../Model/equipo';
import {EquipoService} from '../service/equipo.service';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  jugadores:Jugador[];
  equipos : Equipo[];
  constructor(private service:EquipoService) { }

 async ngOnInit() {
 	let resp =  await this.service.getEquipos().toPromise();
 	console.log(resp);
 		if(resp.code == 200){
 			this.equipos = resp.equipos;
 		}
  }
}
