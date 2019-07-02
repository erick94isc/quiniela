import { Component, OnInit , ViewChild } from '@angular/core';
import {Equipo} from '../Model/equipo';
import {Partido} from '../Model/partido';
import {PartidoService} from '../service/partido.service';
import {EquipoService} from '../service/equipo.service';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {ActivatedRoute,Router} from '@angular/router';



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
  minDate;
  private idTorneo;
  isNew:boolean;
  private idPartido;
  title:string ="";

  constructor(private equipoService:EquipoService, private formBuilder: FormBuilder,  private partidoService:PartidoService,
              private datePipe: DatePipe, private activate:ActivatedRoute,private router:Router ) { 
       
  }

  ngOnInit() {
  	this.minDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd');
    
    this.registerPartido = this.formBuilder.group({
      equipo1: ['', Validators.required],
      equipo2: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
      });
    
    this.getEquipo1();
      if(this.activate.snapshot.paramMap.get('action') === 'new'){      
        this.idTorneo = this.activate.snapshot.paramMap.get('id');
        this.registerPartido.controls['equipo2'].disable();
        this.isNew = true;
        this.title = 'Nuevo Partido';
      }else if (this.activate.snapshot.paramMap.get('action') === 'edit') {
        this.getEquipo2(this.partido.equipo1);
        this.idPartido = this.activate.snapshot.paramMap.get('id');
        this.title = 'Editar Partido';
        this.isNew = false;
      }
   
  }

 async getPartido(){
     try{ 
        let response = await this.partidoService.getPartido(this.idPartido).toPromise();
          if(response.code ==200){
            this.partido = response.partido;
            this.idTorneo = response.partido.torneo;
          }else{
            Swal.fire('Error','No se pudo cargar el partido','error');    
          }
     }catch(e){
         Swal.fire('Error',e.error.message ,'error');    
     }
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

  async getEquipo2(selectedEquipo:string){
    try{
      let resp =await this.equipoService.getEquiposFiltro(selectedEquipo).toPromise();
      if(resp.code == 200){
           this.equipo2 = resp.equipos;
           console.log(this.equipo2);
         }
    }catch(e){
       Swal.fire('Error','','error');
      console.log(e);
    }
  }

  equipo1Changed(selectedEquipo:string){
    this.partido.equipo2="";
    if(selectedEquipo != ''){
      this.getEquipo2(selectedEquipo);
      this.registerPartido.controls['equipo2'].enable();
    }else{
       this.registerPartido.controls['equipo2'].disable();
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
   this.partido.torneo = this.idTorneo;
   response = await this.partidoService.create(this.partido).toPromise();
   if(response.code = 200){
     Swal.fire('','Partido guardado correctamente', 'success');
     this.router.navigate(['/partidos',this.idTorneo]);
   } else {
      Swal.fire('Error','No fue posible guardar el partido','error');
   }

	}catch(e){
		Swal.fire('Error',e.error.message,'error');
		console.log(e);
	}

}

}
