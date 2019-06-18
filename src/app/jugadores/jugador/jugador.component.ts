import { Component, OnInit,Input } from '@angular/core';
import {JugadorService} from '../../service/jugador.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';



@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.scss']
})
export class JugadorComponent implements OnInit {

 @Input() public jugador;
 private id_jugador;
 private idEquipo;
  constructor(private service:JugadorService,private router:Router) { }

  ngOnInit() {
  	this.id_jugador = this.jugador._id;
    this.idEquipo = this.jugador.equipo;
  	console.log(this.id_jugador);
  }

  async eliminarJugador(){
   let response= await this.service.delete(this.id_jugador).toPromise();
     if(response.code==200){
       Swal.fire('','Jugador se eliminó correctamente','success');
       //this.router.navigate(['/jugadores',this.idEquipo]);
     }else{
        Swal.fire('Error','No fue posible eliminar el jugador','error');
     }
  }

}
