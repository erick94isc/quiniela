import { Component, OnInit } from '@angular/core';
import {Usuario} from '../Model/usuario';
import {AuthService} from '../service/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:Usuario = new Usuario();
  title:string;
  password2:String;
  usuarioForm: FormGroup;
  submitted:boolean;
  isNew:boolean;
  private id;
  constructor( private formBuilder: FormBuilder, private service:AuthService, private activated:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.id = this.activated.snapshot.paramMap.get('id');
    this.title='Nuevo Usuario';
        this.usuarioForm = this.formBuilder.group({
         nombre: ['', Validators.required] ,
         apellido:['',Validators.required],
         password:['',Validators.required],
         email:['',Validators.required],
         username:['',Validators.required],
         password2:['',Validators.required]     
     },{validator: this.MustMatch('password','password2')});

     if(this.id !== 'nuevo'){
       this.title = 'Editar Usuario';
        this.isNew = false;
        this.getUsuario();
     }else if(this.id == 'nuevo'){
       this.title = 'Nuevo Usuario';
       this.isNew = true;
     }
  }

  async getUsuario(){
    try{
      let response = await this.service.getUsuario(this.id).toPromise();
      if(response.code == 200)
         {
         this.usuario = response.usuario;
         console.log(this.usuario);
       }
    }catch(e){
      console.log(e);
      Swal.fire('Error',e.error.message ,'error');  
    }
  }

  get f(){return this.usuarioForm.controls; }

  MustMatch(controlName:string,matchingControlName:string){
     return (formGroup: FormGroup) => {
       const control = formGroup.controls[controlName];
       const matchingControl = formGroup.controls[matchingControlName];

       if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

       if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
   }
  }

  onSubmit(){
     this.submitted = true;    
   if(this.usuarioForm.invalid){      
      return;
    } else {
      this.guardar();
    }  
  }

 async  guardar(){
  	try{
        let response = await this.service.register(this.usuario).toPromise();
        if(response.code ==200){
         Swal.fire('','Se guardo','success'); 
          this.router.navigate(['/equipos']); 
        }else {
           Swal.fire('Error','No fue posible guardar el jugador','error');
          }
    }catch(e){
       Swal.fire('Error',e.error.message ,'error');  
    }
  }
}
