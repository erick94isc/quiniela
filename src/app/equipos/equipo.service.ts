import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {
 private urlEndPoint = '';

  constructor(private http:HttpClient) { }
}
