import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'pdi-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit() {
    this.auth.user
      .subscribe(user => {
        console.log(user)
      })
    
  }
  signIn() {
    this.router.navigate(['login'])
  }
  signUp() {
    this.router.navigate(['login/signup'])
  }

}
