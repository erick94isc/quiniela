import {Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Usuario} from '../Model/usuario';
import {tap} from 'rxjs/operators';
import * as url from '../urlEndPoint';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _token:string;
  _username:string;
  uri:string = url.urlEndPoint;  
  constructor(private http:HttpClient) {
   }

   public get token():string{
     if(this._token != null){
       return this._token;
     }else if(this._token == null && sessionStorage.getItem('token') != null){
       this._token = sessionStorage.getItem('token');
       return this._token;
     }
     return null;
   }

   login(usuario: Usuario):Observable<any>{

   	const urlEndPoint = '';

   	const credenciales = btoa(''+':'+ '');

   	const httpHeaders = new HttpHeaders({
   		'Content-Type':'application/x-www-form-urlencoded',
   		'Authorization':'Basic' + credenciales
   	});
   	let params = new URLSearchParams();
   	params.set('grant_type','password');
   	params.set('username',usuario.username);
   	params.set('password',usuario.password);

   	return this.http.post<any>(urlEndPoint,params.toString(),{headers:httpHeaders});
   }

   obtenerDatosToken(accessToken:string):any{
     if(accessToken !=null){
       return JSON.parse(accessToken.split(".")[1])
     }
     return null;
   }

   guardarUsuarioToken(accessToken:string):void{
     let payload = this.obtenerDatosToken(accessToken);
     this._token = accessToken;
     this._username = payload.user_name;
     sessionStorage.setItem('username',payload.user_name);
     sessionStorage.setItem('token',accessToken);
   }

   isAuthenticated():boolean{
     let payload = this.obtenerDatosToken(this.token);
     if(payload != null && payload.user_name && payload.user_name.length > 0){
       return true;
     }
     return false;
   }

   logout(){
     this._token = null;
     this._username = null;
     sessionStorage.clear();
   }
}
