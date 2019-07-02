import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import {Equipo} from '../Model/equipo';
import * as url from '../urlEndPoint';
import {Observable,of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private uri:string = url.urlEndPoint + '/equipo';
  private uriFiltro:string = url.urlEndPoint + '/equipoFilter';	
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) { }

  getEquipos(name:string,torneo:string):Observable<any>{
    let params = new HttpParams();

    params = params.append('nombre',name);
    params = params.append('torneo',torneo);
    return this.http.get(this.uri,{headers:this.httpHeaders,params:params});
  }

  getEquipo(id:number):Observable<any>{
	  return this.http.get<any>(`${this.uri}/${id}`);
  }

  create(equipo:Equipo):Observable<any>{
  	return this.http.post<any>(this.uri,equipo,{headers:this.httpHeaders})
  }

  update(equipo:Equipo):Observable<void>{
  	return this.http.put<void>(`${this.uri}/${equipo._id}`,equipo,{headers:this.httpHeaders})
  }

  delete(id):Observable<any>{
  	return this.http.delete<any>(`${this.uri}/${id}`);
  }

  getEquiposFiltro(equipo:string):Observable<any>{
     let params = new HttpParams();
      params = params.append('equipo',equipo);
     return this.http.get(this.uriFiltro,{headers:this.httpHeaders,params:params});
  }

}
