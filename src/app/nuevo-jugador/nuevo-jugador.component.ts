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
  private idJugador;
  isNew:boolean;
  title:string;
  constructor(private service:PosicionService,private jugadorService:JugadorService, private router:Router, 
              private datepipe:DatePipe,private activated:ActivatedRoute, private formBuilder: FormBuilder) {	
  }

   ngOnInit() {          
     this.service.getPosiciones().subscribe(
       resp=>{
          this.posiciones = resp;
       });
     if(this.activated.snapshot.paramMap.get('action') === 'new'){
        this.idEquipo = this.activated.snapshot.paramMap.get('id');
        this.title = 'Nuevo Jugador';
        this.isNew = true;
     }else{
        this.idJugador = this.activated.snapshot.paramMap.get('id');
        this.title = 'Editar Jugador';
        this.isNew = false;
        this.getJugador();
     }

     this.jugadorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['' , Validators.required],
      telefono: ['' , Validators.required],
      fecha_nacimiento: ['' , Validators.required],
      posicion: ['', Validators.required],
      numero: ['', Validators.required]
    }); 
    this.jugador.fecha_nacimiento = this.datepipe.transform(new Date(), "dd/MM/yyyy");          
  }

 async getJugador(){
   try{
     let resp = await this.jugadorService.getJugador(this.idJugador).toPromise();
      if(resp.code == 200)
         {
         this.jugador = resp.jugador;
         console.log(this.jugador);
       }
   }catch(e){
     Swal.fire('Error',e.error.message ,'error');    
   }
 }

 async guardar(){
   try{
        var response;
         if(this.isNew){
        this.jugador.equipo = this.idEquipo;       
        response = await this.jugadorService.create(this.jugador).toPromise();
        }else{
         response = await this.jugadorService.update(this.jugador).toPromise();
        }
        if(response.code = 200){
            Swal.fire('','Jugador guardado correctamente','success');
            this.router.navigate(['/jugadores',this.idEquipo]);
          } 
          else {
           Swal.fire('Error','No fue posible guardar el jugador','error');
          } 
      }catch(e){
        Swal.fire('Error', 'No fue posible guardar el jugador','error')
      }
  }

  get f() { return this.jugadorForm.controls; }

  onSubmit(){
    this.submitted = true;    
    if(this.jugadorForm.invalid){      
      return;
    } else {
      this.guardar();
    }    
  } 

}