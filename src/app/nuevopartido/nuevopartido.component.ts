import { Component, OnInit , ViewChild } from '@angular/core';
import {Equipo} from '../Model/equipo';
import {Partido} from '../Model/partido';
import {PartidoService} from '../service/partido.service';
import {EquipoService} from '../service/equipo.service';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  constructor(private equipoService:EquipoService, private formBuilder: FormBuilder,  private partidoService:PartidoService ) { 

  }

  ngOnInit() {
  	this.equipoService.getEquipos("","").subscribe(
  		resp=> {  			
  			if(resp.code == 200){
  				this.equipo1 = resp.equipos;
  				this.equipo2 = resp.equipos;
  			} 
  		});
  	this.registerPartido = this.formBuilder.group({
  		equipo1: ['-1', Validators.required],
  		equipo2: ['-1', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
  	});

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
