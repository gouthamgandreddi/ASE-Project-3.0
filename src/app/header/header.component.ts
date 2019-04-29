import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {toArray} from "rxjs/operators";

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
<<<<<<< HEAD

  searchModel(searchValue: HTMLInputElement) {
     console.log(searchValue.value);
     this.authService.getSearchResult(searchValue.value).subscribe( res =>
     {
       this.authService.changeMessage(res);
       console.log('Searching for Models' + res);
     }
   )
=======
  searchModel(searchValue: HTMLInputElement) {
    console.log(searchValue.value);
    this.authService.getSearchResult(searchValue.value).subscribe( res =>
        {
          this.authService.changeMessage(res);
          console.log('Searching for Models' + res);
        }
    )
>>>>>>> b333ed7f5cc3016a71d43803b46774706f7b2d5c
  }

  ngOnDestroy(){
    this.authListnerSubs.unsubscribe();
  }
}
