import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as url from '../urlEndPoint';
import {Observable,of} from 'rxjs';
import {Partido} from '../Model/partido';
import {map} from 'rxjs/operators';

@Injectable({
	 providedIn: 'root'
	})
 export class PartidoService {

 	private uri:string = url.urlEndPoint + '/partido'
 	private uriPartidos = url.urlEndPoint + '/partidos'
 	private httpHeaders = new HttpHeaders({'Content-type':'application/json'})
 	constructor(private http:HttpClient) { }

	getPartidos(id):Observable<any>{
		return this.http.get(`${this.uriPartidos}/${id}`);
	} 	

	getPartido(id:number):Observable<any>{
		return this.http.get<any>(`${this.uri}/${id}`);
	}

	create(partido:Partido):Observable<any>{
		return this.http.post<any>(this.uri,partido,{headers:this.httpHeaders})
	}

	update(partido:Partido):Observable<any>{
		return this.http.put<void>(`${this.uri}/${partido._id}`,partido,{headers:this.httpHeaders})
	}
	
	delete(id):Observable<any>{
		return this.http.delete<void>(`${this.uri}/${id}`);
	}	

 }
