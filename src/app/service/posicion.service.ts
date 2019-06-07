import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as url from '../urlEndPoint';
import {Observable,of} from 'rxjs';
import {Posicion} from '../Model/posicion';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PosicionService {
 
  constructor(private http:HttpClient) {

   }

  getPosicion():Observable<Posicion[]>{
  	return this.http.get(url.urlEndPoint+'/posicion').pipe(
  		map((respose)=> respose as Posicion[])
  		);
  }
}
