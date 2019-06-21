import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import * as url from '../urlEndPoint';
import {Observable,of} from 'rxjs';
import {Jugador} from '../Model/jugador';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  private uri:string = url.urlEndPoint + '/jugador';

  constructor(private http:HttpClient) { }

  getJugadores(id:number):Observable<any>{
  return this.http.get(`${this.uri+'es'}/${id}`);
  }

  getJugador(id):Observable<any>{
  	return this.http.get<any>(`${this.uri}/${id}`)
  }

  create(jugador:Jugador): Observable<any>{
  	return this.http.post<any>(this.uri,jugador,{headers:this.httpHeaders});
  }

  delete(id):Observable<any>{
  	return this.http.delete<any>(`${this.uri}/${id}`)
  }

  update(jugador:Jugador):Observable<any>{
  		return this.http.put<any>(`${this.uri}/${jugador._id}`,jugador,{headers:this.httpHeaders})
  }

}
