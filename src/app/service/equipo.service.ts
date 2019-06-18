import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Equipo} from '../Model/equipo';
import * as url from '../urlEndPoint';
import {Observable,of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private uri:string = url.urlEndPoint + '/equipo'	
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }

  getEquipos(name:string):Observable<any>{
    if(name == ""){
          return this.http.get(this.uri);
     }else{
         return this.http.get(`${this.uri}/${name}`)
        }
  }

  getEquipo(id:number):Observable<Equipo>{
	  return this.http.get<Equipo>(`${this.uri}/${id}`);
  }

  create(equipo:Equipo):Observable<any>{
  	return this.http.post<any>(this.uri,equipo,{headers:this.httpHeaders})
  }

  update(equipo:Equipo):Observable<void>{
  	return this.http.put<void>(`${this.uri}/${equipo.id}`,equipo,{headers:this.httpHeaders})
  }

  delete(id):Observable<void>{
  	return this.http.delete<void>(`${this.uri}/${id}`);
  }

}
