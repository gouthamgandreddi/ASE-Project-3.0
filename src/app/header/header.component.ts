import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  private authListnerSubs: Subscription;
  private userIsAuthenticated = false;

  userName:string ='UserProfile';
  constructor(private authService:AuthService) { }

  ngOnInit() {

    this.authListnerSubs = this.authService
        .getAuthStatusListner()
        .subscribe(isAuthenticated => {
            this.userIsAuthenticated=isAuthenticated;
            this.userName = localStorage.getItem('username');
        });
  }

  onLogout(){  //should clear the token
    this.userIsAuthenticated = false;
    this.authService.logout();
    this.userName='UserProfile';
  }
  ngOnDestroy(){
    this.authListnerSubs.unsubscribe();
  }
}
