import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';
import {Equipo} from '../Model/equipo';
import {EquipoService} from '../service/equipo.service';
import {Torneo} from '../Model/torneo';
import {TorneoService} from '../service/torneo.service';



@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  jugadores:Jugador[];
  equipos : Equipo[];
  torneos: Torneo[];
  selectedToreno:string;
  constructor(private service:EquipoService, private torneoService:TorneoService) { }

 async ngOnInit() {
 	let resp =  await this.service.getEquipos("").toPromise();
 	console.log(resp);
 		if(resp.code == 200){
 			this.equipos = resp.equipos;
 		}
    this.torneoService.getTorneos().subscribe(
     resp=>{
           this.torneos = resp;
     },error=>{
       console.log(error);
     });

  }

  delete(){
  	console.log("eliminar");
  }

 async onSearchChange(searchValue : string ) {  
     let resp =  await this.service.getEquipos(searchValue).toPromise();
   console.log(resp);
     if(resp.code == 200){
       this.equipos = resp.equipos;
     }
  }

  searchByLeague(){
   
  }
}
