import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as url from '../urlEndPoint';
import {Observable,of} from 'rxjs';
import {Posicion} from '../Model/posicion';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PosicionService {
 
  private uri:string = url.urlEndPoint + '/posicion'  	
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http:HttpClient) {

   }

  getPosiciones():Observable<Posicion[]>{
  	return this.http.get(url.urlEndPoint+'/posicion').pipe(
  		map((respose)=> respose as Posicion[])
  		);
  }
 
  getPosicion(id:number):Observable<Posicion>{
  	return this.http.get<Posicion>(`${this.uri}/${id}`);
  }

  create(posicion:Posicion):Observable<Posicion>{
  	return this.http.post<Posicion>(this.uri,posicion,{headers:this.httpHeaders})
  }
  update(posicion:Posicion):Observable<void>{
  	return this.http.put<void>(`${this.uri}/${posicion.id}` ,posicion,{headers:this.httpHeaders})
  }

  delete(id):Observable<void>{
  	return this.http.delete<void>(`${this.uri}/${id}`);
  }

}