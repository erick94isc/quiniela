import { Component, OnInit } from '@angular/core';
import {Usuario} from '../Model/usuario';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 usuario:Usuario;

  constructor(private auth:AuthService, private router:Router) {
  this.usuario = new Usuario();
   }

  ngOnInit() {
  	if(this.auth.isAuthenticated()){
  		this.router.navigate(['/equipos']);
  	}
  }

  login():void{
  	if(this.usuario.username == null || this.usuario.password == null){
  		Swal.fire('Error Login','Usuario o contraseña vacíos','error');
  		return ;
  	}

  	this.auth.login(this.usuario).subscribe(resp=>{
  		
  		this.auth.guardarUsuarioToken(resp.access_token);
  		this.router.navigate(['/equipos']);
  		Swal.fire('Login','Hola','success');
  	}, error=>{
  		if(error == 400){
  			Swal.fire('Error Login','Usuario o contraseña incorrectas','error');
  		}
  	});
  }
}
