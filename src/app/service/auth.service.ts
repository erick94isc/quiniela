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
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});
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

   public get user():string{
     if(this._username != null){
       return this._username;
     }else if(this._username == null && sessionStorage.getItem('username') != null){
       this._username = sessionStorage.getItem('username');
       return this._username;
     }
     return null;
   }

   register(usuario:Usuario):Observable<any>{
     return this.http.post<any>(this.uri+'/register',usuario,{headers:this.httpHeaders});
   }

   login(usuario: Usuario):Observable<any>{
   	return this.http.post<any>(this.uri +'/login',usuario,{headers:this.httpHeaders});
   }

   guardarUsuarioToken(accessToken:string,usuario:string,expires:string):void{
     this._token = accessToken;
     this._username = usuario;
     sessionStorage.setItem('username',usuario);
     sessionStorage.setItem('token',accessToken);
     sessionStorage.setItem('expires',expires)
   }

   isAuthenticated():boolean{
     if(this.token != null && this.user){
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
