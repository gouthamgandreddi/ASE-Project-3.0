import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider, SocialUser
} from 'angular-6-social-login';
import {Router} from '@angular/router';
import {Subject} from "rxjs";

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  public user: SocialUser;

  private token: any;
  private userIsAuthenticted =false;
  private authStatusListner = new Subject<boolean>();
  private tokenTimer:any;

  constructor(private socialAuthService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userdata) => {
      this.user = this.user;
      console.log(userdata);
      console.log(userdata.name);
      // this.data.changeMessage(userdata.name);
      localStorage.setItem('username', userdata.name);

      this.userIsAuthenticted =true;
      this.authStatusListner.next(true);
      const now = new Date();
      this.router.navigate(['/home']);
    });
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
