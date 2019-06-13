import { Component, OnInit } from '@angular/core';
import {Torneo} from '../Model/torneo';
import {TorneoService} from '../service/torneo.service';
import Swal from 'sweetalert2'
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-nuevo-torneo',
  templateUrl: './nuevo-torneo.component.html',
  styleUrls: ['./nuevo-torneo.component.css']
})
export class NuevoTorneoComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  torneo : Torneo = new Torneo();  
  constructor(private torneoService:TorneoService, private router:Router , private formBuilder: FormBuilder) { }

  ngOnInit() {
  	this.registerForm = this.formBuilder.group({
  		nombre: ['', Validators.required],
  		categoria: ['', Validators.required],
  		fechaInicial: ['', Validators.required],
  		fechaFinal: ['', Validators.required],
  	});
  }

 get f() { return this.registerForm.controls; }


  onSubmit(){
  	this.submitted = true;

  	//Stop here if form is invalid 
  	if(this.registerForm.invalid){
  		return;
  	}

  	Swal.fire('Adventencia','Success!!' + JSON.stringify(this.registerForm.value), 'success');
  } 

  guardarTorneo(){
  	console.log(this.torneo);
  	this.torneoService.create(this.torneo).subscribe(
  		response=>{
  			console.log(response);
  			this.router.navigate(['/nuevoTorneo']);
  			Swal.fire('Advertencia','Torneo guardado correctamente', 'success');
  		}, error=>{
  			Swal.fire('Error','No fue posible guardar el torneo','error');
  			console.log(error);
  		});
  }
}
