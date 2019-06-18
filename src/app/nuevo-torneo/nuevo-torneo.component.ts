import { Component, OnInit } from '@angular/core';
import {Torneo} from '../Model/torneo';
import {TorneoService} from '../service/torneo.service';
import Swal from 'sweetalert2'
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-nuevo-torneo',
  templateUrl: './nuevo-torneo.component.html',
  styleUrls: ['./nuevo-torneo.component.css']
})
export class NuevoTorneoComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  fechaInicial: string; 
  torneo : Torneo = new Torneo(); 
  constructor(private torneoService:TorneoService, private router:Router , private formBuilder: FormBuilder,   private datePipe: DatePipe) { }

  ngOnInit() {
  	this.registerForm = this.formBuilder.group({
  		nombre: ['', Validators.required],
  		categoria: ['', Validators.required],
  		fechaInicial: ['', Validators.nullValidator],
  		fechaFinal: ['', Validators.nullValidator],
  	});      
    //this.torneo.fechaInicial = this.datePipe.transform(new Date(), "dd/MM/yyyy");          
    //console.log(this.torneo.fechaInicial);
  }

 get f() { return this.registerForm.controls; }


  onSubmit(){
  	this.submitted = true;  	
    console.log(this.submitted);
  	if(this.registerForm.invalid){      
  		return;
  	} else {
      this.guardarTorneo();
    }  	
  } 

  async guardarTorneo(){
    let response = await this.torneoService.create(this.torneo).toPromise();    
    console.log(response);
    if(response.code = 200){
      Swal.fire('','Torneo guardado correctamente', 'success');
     } else {
        Swal.fire('Error','No fue posible guardar el torneo','error');
    }  	
  }
}