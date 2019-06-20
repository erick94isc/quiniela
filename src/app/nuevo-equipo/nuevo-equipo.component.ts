import {Component, OnInit , ViewChild} from '@angular/core';
import {ColorPickerModule } from 'ngx-color-picker';
import {Equipo} from '../Model/equipo';
import {Torneo} from '../Model/torneo';
import {TorneoService} from '../service/torneo.service';
import {EquipoService} from '../service/equipo.service';
import Swal from 'sweetalert2'
import {Router,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-nuevo-equipo',
  templateUrl: './nuevo-equipo.component.html',
  styleUrls: ['./nuevo-equipo.component.css']
})
export class NuevoEquipoComponent implements OnInit {
  registerEquipo: FormGroup;
  submitted = false;
  equipo: Equipo = new Equipo();   	
  color: string;
  torneo : Torneo[];
  title:string;
  private id;
  isNew:boolean;
  constructor(private torneoservice:TorneoService, private equipoService: EquipoService , private router:Router , 
            private formBuilder: FormBuilder, private activatedRoute:ActivatedRoute) {    
   }

   ngOnInit() { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.torneoservice.getTorneos("").subscribe(
       resp=>{
         if(resp.code == 200)
         {
         this.torneo = resp.torneos;
       }
       });
      if(this.id !== 'nuevo'){
        this.title ='Editar Equipo';
        this.getEquipo();
        this.isNew = false;
      }else{
        this.title = 'Nuevo Equipo';
        this.isNew = true;
      }
      this.registerEquipo = this.formBuilder.group({
         nombre: ['', Validators.required],
         torneo: ['', Validators.required],
         color: ['', Validators.nullValidator]         
     });
  }

  get f() {return this.registerEquipo.controls; }

 async getEquipo(){
   try{
   let resp= await this.equipoService.getEquipo(this.id).toPromise();
      if(resp.code == 200)
         {
         this.equipo = resp.equipo;
         console.log(this.equipo);
       }
     }
     catch(e){
       Swal.fire('Error',e.error.message ,'error');    
     }
  }

  onSubmit(){
    this.submitted = true;
    if(this.registerEquipo.invalid){      
      return;
    }else{
      this.guardarEquipo();      
    }

  }

async guardarEquipo() {      
      try{
        var response;
          if(this.isNew){
             response= await this.equipoService.create(this.equipo).toPromise();    
            } else{
              response = await this.equipoService.update(this.equipo).toPromise(); 
            } 
          console.log(response);
          if(response.code = 200){
            Swal.fire('','Equipo guardado correctamente','success');
            this.router.navigate(['/equipos']);
          } else {
           Swal.fire('Error','No fue posible guardar el equipo','error');
          }
      }catch(e){
          Swal.fire('Error',e.error.message ,'error');      
          console.log(e);
      }
  }

}