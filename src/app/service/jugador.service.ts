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

  getJugador(id):Observable<Jugador>{
  	return this.http.get<Jugador>(`${this.uri}/${id}`)
  }

  create(jugador:Jugador): Observable<Jugador>{
  	return this.http.post<Jugador>(this.uri,jugador,{headers:this.httpHeaders});
  }

  delete(id):Observable<void>{
  	return this.http.delete<void>(`${this.uri}/${id}`)
  }

  update(jugador:Jugador):Observable<void>{
  		return this.http.put<void>(`${this.uri}/${jugador.id}`,jugador,{headers:this.httpHeaders})
  }

}
