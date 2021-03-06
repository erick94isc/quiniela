import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showNav: boolean;
  constructor(private auth: AuthService, private router: Router) { }

  async ngOnInit() {
  }

  logout(): void {
    this.auth.logout();
    Swal.fire('Logout', '', 'success');
    this.router.navigate(['/login']);
  }
}
