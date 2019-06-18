import {Component, OnInit , ViewChild} from '@angular/core';
import {ColorPickerModule } from 'ngx-color-picker';
import {Equipo} from '../Model/equipo';
import {Torneo} from '../Model/torneo';
import {TorneoService} from '../service/torneo.service';
import {EquipoService} from '../service/equipo.service';
import Swal from 'sweetalert2'
import {Router} from '@angular/router';
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
  constructor(private torneoservice:TorneoService, private equipoService: EquipoService , private router:Router , private formBuilder: FormBuilder) {    
   }

   ngOnInit() { 
   	this.torneoservice.getTorneos().subscribe(
       resp=>{
         this.torneo = resp;
       });
      this.registerEquipo = this.formBuilder.group({
         nombre: ['', Validators.required],
         torneo: ['', Validators.required],
         color: ['', Validators.nullValidator]         
     });
     
  }

  get f() {return this.registerEquipo.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.registerEquipo.invalid){      
      return;
    }else{
      this.guardarEquipo();      
    }

  }

async guardarEquipo() {      
      let response  = await this.equipoService.create(this.equipo).toPromise();      
      console.log(response);
      if(response.code = 200){
        Swal.fire('','Equipo guardado correctamente','success');
        this.router.navigate(['/equipos']);
      } else {
       Swal.fire('Error','No fue posible guardar el equipo','error');
      }
  
  }

}