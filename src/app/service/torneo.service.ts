import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as url from '../urlEndPoint';
import {Observable,of} from 'rxjs';
import {Torneo} from '../Model/torneo';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  
  private uri:string = url.urlEndPoint + '/torneo'
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})	
  constructor(private http:HttpClient) { }


   getTorneos():Observable<any>{
   		return this.http.get(url.urlEndPoint+'/torneo').pipe(
   			map((respose)=> respose as Torneo[])
   		);
   }

   getTorneo(id:number):Observable<Torneo>{
   	 return this.http.get<Torneo>(`${this.uri}/${id}`);
   }

   create(torneo:Torneo):Observable<any>{
   	 return this.http.post<any>(this.uri,torneo,{headers:this.httpHeaders})
   }

   update(torneo:Torneo):Observable<void>{
   	 return this.http.put<void>(`${this.uri}/${torneo.id}`,torneo,{headers:this.httpHeaders})
   }

   delete(id):Observable<void>{
   	return this.http.delete<void>(`${this.uri}/${id}`);
   } 

}
