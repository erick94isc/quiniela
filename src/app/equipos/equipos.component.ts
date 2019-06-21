import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';
import {Equipo} from '../Model/equipo';
import {EquipoService} from '../service/equipo.service';
import {Torneo} from '../Model/torneo';
import {TorneoService} from '../service/torneo.service';
import Swal from 'sweetalert2';



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
  private id_equipo;
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

  delete(id:string){   
    Swal.fire({ title:'¿Estas seguro?', text: "Desea eliminar el torneo", 
     type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText : 'Cancelar!'}).then((result) => {
        if(result.value){
          this.id_equipo = id;
          this.service.delete(this.id_equipo).subscribe(
            resp=> {
              if(resp.code == 200){
                Swal.fire('Eliminado', 'El Equipo ha sido eliminado correctamente','success');
              } else {
                Swal.fire('Error','No fue posible eliminar el equipo','error');
              }
            });
        }
      });
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
