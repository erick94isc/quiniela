import { Component, OnInit } from '@angular/core';
import {PartidoService} from '../service/partido.service';
import {TorneoService} from '../service/torneo.service';
import {Partido} from '../Model/partido';
import {Torneo} from '../Model/torneo';
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {

  partidos:Partido[];
  private idTorneo;
  torneo:Torneo= new Torneo();
  fecha:Date;
  constructor(private service:PartidoService, private activated:ActivatedRoute,private torneoService:TorneoService) { }

  async ngOnInit() {
  	this.idTorneo = this.activated.snapshot.paramMap.get('id');
    this.getPartidos();
    const responseTorneo = await this.torneoService.getTorneo(this.idTorneo).toPromise();
      if(responseTorneo.code == 200){
       this.torneo = responseTorneo.torneo;
     }
  }

  async getPartidos(){
    try{
      const response = await this.service.getPartidos(this.idTorneo).toPromise();
      if(response.code == 200){
       this.partidos = response.partidos;
       console.log(this.partidos);
     }
    }catch(e){
        Swal.fire('Error',e.error.message ,'error');  
    }
  }

}
