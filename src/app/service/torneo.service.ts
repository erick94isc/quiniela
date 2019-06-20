import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
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


   getTorneos(name:string):Observable<any>{
      let params = new HttpParams();

      params = params.append('nombre',name);      
      return this.http.get(this.uri,{headers:this.httpHeaders,params:params});   		
   }

   getTorneo(id:number):Observable<any>{
   	 return this.http.get<any>(`${this.uri}/${id}`);
   }

   create(torneo:Torneo):Observable<any>{
   	 return this.http.post<any>(this.uri,torneo,{headers:this.httpHeaders})
   }

   update(torneo:Torneo):Observable<void>{
   	 return this.http.put<void>(`${this.uri}/${torneo._id}`,torneo,{headers:this.httpHeaders})
   }

   delete(id):Observable<any>{
   	return this.http.delete<void>(`${this.uri}/${id}`);
   } 

}
