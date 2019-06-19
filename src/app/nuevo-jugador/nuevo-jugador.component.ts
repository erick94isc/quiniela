import { Component, OnInit } from '@angular/core';
import {Jugador} from '../Model/jugador';
import {Posicion} from '../Model/posicion';
import {PosicionService} from '../service/posicion.service';
import {JugadorService} from '../service/jugador.service';
import Swal from 'sweetalert2'
import {Router,ActivatedRoute} from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-jugador',
  templateUrl: './nuevo-jugador.component.html',
  styleUrls: ['./nuevo-jugador.component.css']
})
export class NuevoJugadorComponent implements OnInit {  
	jugadorForm : FormGroup;
  submitted = false;
  jugador :Jugador= new Jugador();
  posiciones:Posicion[];  
  private idEquipo;  
  
  constructor(private service:PosicionService,private jugadorService:JugadorService, private router:Router, private datepipe:DatePipe,private activated:ActivatedRoute, private formBuilder: FormBuilder) {	
  }

   ngOnInit() {          
     this.service.getPosiciones().subscribe(
       resp=>{
          this.posiciones = resp;
       });
     this.idEquipo = this.activated.snapshot.paramMap.get('id');
     console.log(this.idEquipo);
     this.jugadorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['' , Validators.required],
      telefono: ['' , Validators.required],
      fecha_nacimiento: ['' , Validators.required],
      posicion: ['', Validators.required],
      numero: ['', Validators.required],
      goles: ['', Validators.nullValidator],
      tarjetas_amarillas: ['', Validators.nullValidator],
      tarjetas_rojas: ['', Validators.nullValidator],
    }); 
    this.jugador.fecha_nacimiento = this.datepipe.transform(new Date(), "dd/MM/yyyy");          
  }

 async guardar(){
    this.jugador.equipo = this.idEquipo;
    console.log(this.jugador);
    let response = await this.jugadorService.create(this.jugador).toPromise();
    if(response.code = 200){
        Swal.fire('','Equipo guardado correctamente','success');
        this.router.navigate(['/jugadores',this.idEquipo]);
      } 
      else {
       Swal.fire('Error','No fue posible guardar el equipo','error');
      } 
  }

  get f() { return this.jugadorForm.controls; }

  onSubmit(){
    this.submitted = true;    
    console.log(this.submitted);
    if(this.jugadorForm.invalid){      
      return;
    } else {
      this.guardar();
    }    
  } 

}