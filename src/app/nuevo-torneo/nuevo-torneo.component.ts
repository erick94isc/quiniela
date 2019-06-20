import { Component, OnInit } from '@angular/core';
import {Torneo} from '../Model/torneo';
import {TorneoService} from '../service/torneo.service';
import Swal from 'sweetalert2'
import {Router,ActivatedRoute} from '@angular/router';
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
  private id;
  title:string = '';
  isNew:boolean;
  constructor(private torneoService:TorneoService, private router:Router , private formBuilder: FormBuilder,   private datePipe: DatePipe,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id !== 'nuevo'){
        this.title ='Editar Torneo';
        this.getTorneo();
        this.isNew = false;
      }else{
        this.title = 'Nuevo Torneo';
        this.isNew = true;
      }

  	this.registerForm = this.formBuilder.group({
  		nombre: ['', Validators.required],
  		categoria: ['', Validators.required],
  		fechaInicial: ['', Validators.nullValidator],
  		fechaFinal: ['', Validators.nullValidator],
  	});      
  }

 async getTorneo(){
    try{
   let resp= await this.torneoService.getTorneo(this.id).toPromise();
      if(resp.code == 200)
         {
         this.torneo = resp.torneo;
         console.log(this.torneo);
       }
     }
     catch(e){
       Swal.fire('Error',e.error.message ,'error');    
     }
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

    try{
       var response;
          if(this.isNew){
             response= await this.torneoService.create(this.torneo).toPromise();    
            } else{
              response = await this.torneoService.update(this.torneo).toPromise(); 
            } 
          console.log(response);
        if(response.code = 200){
          Swal.fire('','Torneo guardado correctamente', 'success');
          this.router.navigate(['/torneo']);
         } else {
            Swal.fire('Error','No fue posible guardar el torneo','error');
        }    
  }catch(e){
       Swal.fire('Error',e.error.message ,'error');      
    }
  }
}