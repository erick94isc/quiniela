import { Component, OnInit } from '@angular/core';
import {Usuario} from '../Model/usuario';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   usuario:Usuario;  
   usuarioForm:FormGroup;
   submitted = false;
  constructor(private auth:AuthService, private router:Router,private formBuilder: FormBuilder) {
  this.usuario = new Usuario();
   }

  ngOnInit() {
  	if(this.auth.isAuthenticated()){
  		this.router.navigate(['/equipos']);
  	}

    this.usuarioForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

 get f() { return this.usuarioForm.controls; }

 onSubmit(){
   this.submitted = true;    
   if(this.usuarioForm.invalid){      
      return;
    } else {
      this.login();
    }  
 }

 async login(){
   try{
     console.log(this.usuario);
    let response = await this.auth.login(this.usuario).toPromise();
      if(response.code == 200){
        let usuario = response.dataUser;
        this.auth.guardarUsuarioToken(usuario.accessToken,usuario.id,usuario.expires);
        this.router.navigate(['/equipos']);
      }else if(response.code == 403){
           Swal.fire('Error','Corre y/o contraseña no son correctos' ,'error');
      }
   }catch(e){
           Swal.fire('Error',e.error.message ,'error');      
   }
  }
}
