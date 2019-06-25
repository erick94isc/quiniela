import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiniela';

showNav:boolean;
  constructor(private auth:AuthService) { }
   ngOnChanges()
 {
   alert('nanan')
   this.showNav =  this.auth.isAuthenticated();
 }
}
