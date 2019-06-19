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
  selectedTorneo:string="";
  nombreBuscar:string;
  constructor(private service:EquipoService, private torneoService:TorneoService) { }

 async ngOnInit() {
 	let resp =  await this.service.getEquipos("","").toPromise();
 		if(resp.code == 200){
 			this.equipos = resp.equipos;
 		}
  let respTorneos = await this.torneoService.getTorneos("").toPromise();
  console.log(respTorneos);
      if(respTorneos.code == 200){
          this.torneos = respTorneos.torneos;
      }
  }

  delete(){
  	console.log("eliminar");
  }

 async onSearchChange(searchValue : string ) {  
   this.nombreBuscar = searchValue;
     let resp =  await this.service.getEquipos(searchValue,(this.selectedTorneo != "") ? this.selectedTorneo: "").toPromise();
     console.log(resp);
     if(resp.code == 200){
       this.equipos = resp.equipos;
     }
  }

 async searchByLeague(){
    console.log(this.selectedTorneo)
     let resp =  await this.service.getEquipos("",this.selectedTorneo).toPromise();
     console.log(resp);
     if(resp.code == 200){
       this.equipos = resp.equipos;
     }
  }
}
