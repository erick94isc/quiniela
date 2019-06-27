import { Component, OnInit , ViewChild } from '@angular/core';
import {Equipo} from '../Model/equipo';
import {Partido} from '../Model/partido';
import {PartidoService} from '../service/partido.service';
import {EquipoService} from '../service/equipo.service';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-nuevopartido',
  templateUrl: './nuevopartido.component.html',
  styleUrls: ['./nuevopartido.component.css']
})
export class NuevopartidoComponent implements OnInit {
  partido: Partido = new Partido();	
  registerPartido: FormGroup; 	
  equipo1: Equipo[];
  equipo2: Equipo[];
  submitted = false;
  minDate:Date = new Date();

  constructor(private equipoService:EquipoService, private formBuilder: FormBuilder,  private partidoService:PartidoService,
              private datePipe: DatePipe ) { 
       
  }

  ngOnInit() {
  	this.minDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd');
    console.log(this.minDate);
    this.getEquipo1();
  	this.registerPartido = this.formBuilder.group({
  		equipo1: ['', Validators.required],
  		equipo2: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
  	});

  }

  async getEquipo1(){
    try{
       const response = await this.equipoService.getEquipos("","").toPromise();
         if(response.code == 200){
           this.equipo1 = response.equipos;
           console.log(this.equipo1);
         }
    }catch(e){
      Swal.fire('Error','','error');
      console.log(e);
    }
  }

  get f() {return this.registerPartido.controls; }
  
  onSubmit() {  	
  	this.submitted = true;
  	if(this.registerPartido.invalid){
  		return;
  	} else {
      console.log("guardar");
  		this.guardarPartido();
  	}
  }

async guardarPartido(){
	try{
	 var response;	
   response = await this.partidoService.create(this.partido).toPromise();
   if(response.code = 200){
     Swal.fire('','Partido guardado correctamente', 'success');

   } else {
      Swal.fire('Error','No fue posible guardar el partido','error');
   }

	}catch(e){
		Swal.fire('Error',e.error.message,'error');
		console.log(e);
	}

}

}
