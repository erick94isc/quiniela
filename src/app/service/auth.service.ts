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
  _userID:string;
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

   public get userID():string{
     if(this._userID != null){
       return this._userID;
     }else if(this._userID == null && sessionStorage.getItem('userID') != null){
       this._userID = sessionStorage.getItem('userID');
       return this._userID;
     }
     return null;
   }

   register(usuario:Usuario):Observable<any>{
     return this.http.post<any>(this.uri+'/usuario',usuario,{headers:this.httpHeaders});
   }

   login(usuario: Usuario):Observable<any>{
   	return this.http.post<any>(this.uri +'/login',usuario,{headers:this.httpHeaders});
   }

   getUsuario(id):Observable<any>{
     return this.http.get<any>(`${this.uri}/usuario/${id}`);
   }

   updateUsuario(usuario:Usuario):Observable<any>{
     return this.http.put<any>(`${this.uri}/usuario/${usuario._id}`,usuario,{headers:this.httpHeaders});
   }

   delete(id):Observable<any>{
     return this.http.delete<any>(`${this.uri}/usuario/${id}`);
   }

   guardarUsuarioToken(accessToken:string,id:string,expires:string):void{
     this._token = accessToken;
     this._userID = id;
     sessionStorage.setItem('userID',id);
     sessionStorage.setItem('token',accessToken);
     sessionStorage.setItem('expires',expires)
   }

   isAuthenticated():boolean{
     if(this.token != null && this.userID){
       return true;
     }
     return false;
   }

   logout(){
     this._token = null;
     this._userID = null;
     sessionStorage.clear();
   }
}
