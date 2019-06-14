import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';
import {Posicion} from '../Model/posicion';
import {PosicionService} from '../service/posicion.service';
import {JugadorService} from '../service/jugador.service';
import Swal from 'sweetalert2'
import {Router,ActivatedRoute} from '@angular/router';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-nuevo-jugador',
  templateUrl: './nuevo-jugador.component.html',
  styleUrls: ['./nuevo-jugador.component.css']
})
export class NuevoJugadorComponent implements OnInit {

	jugador :Jugador= new Jugador();
  posiciones:Posicion[];
  date:string;
  private idEquipo;
  	constructor(private service:PosicionService,private jugadorService:JugadorService, private router:Router, private datepipe:DatePipe,private activated:ActivatedRoute) {	
   }

 async ngOnInit() {     
     this.posiciones = await this.service.getPosiciones().toPromise();
     this.idEquipo = this.activated.snapshot.paramMap.get('id');
     console.log(this.idEquipo);
  }

  guardar(){
    this.jugador.equipo = this.idEquipo;
    console.log(this.jugador);
    this.jugadorService.create(this.jugador).subscribe(
      response=>{
        console.log(response);
        this.router.navigate(['/jugadores']);
        Swal.fire('','Jugador guardado','success');
      },error=>{
        Swal.fire('Error','No fue posible guardar el jugador','error');
        console.log(error);
      });
  }

}