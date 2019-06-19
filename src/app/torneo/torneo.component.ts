import { Component, OnInit , Input  } from '@angular/core';
import {Torneo} from '../Model/torneo';
import {TorneoService} from '../service/torneo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css']
})
export class TorneoComponent implements OnInit {
  
  @Input() public torneo;
  private id_torneo;
  torneos: Torneo[];
  nombreBuscar: string; 
  selected : string =""; 
  constructor(private torneoService:TorneoService) { }

  async ngOnInit() {  	
  	let resp = await this.torneoService.getTorneos("").toPromise();
    console.log(resp);
  	if(resp.code == 200) {
  		this.torneos = resp;
  	}
  
  }

  eliminar(id:string ){
  	this.id_torneo = id;
  	console.log(this.id_torneo);
  }


  /*async eliminar(id:string){ 
  //Swal.fire({ title: '¿Estas seguro?', text: "Desea eliminar el torneo",
  //type: 'warning',   showCancelButton: true, confirmButtonColor: '#3085d6',
  //cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText : 'Cancelar!'}).then((result) => {  
  //if (result.value) {
  	//metodo para eliminar
  	this.id_torneo = id;	
    console.log(this.id_torneo);
    let response = await this.torneoService.delete(this.id_torneo).toPromise();
    if(response.code == 200){
    Swal.fire('Eliminado', 'Torneo se elimino correctamente',
      'success') 
    } else {
      Swal.fire('Error','No fue posible eliminar el jugador','error');	
    }
  //}
});*/
//}

  async onSearchChange(searchValue : string){
  	this.nombreBuscar = searchValue;
  	let resp = await this.torneoService.getTorneos(searchValue).toPromise();
  	console.log(resp);
  	if(resp.code ==200){
  		this.torneos = resp.torneos;
  	}
  }

} 
