import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatExpansionModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule, MatIconModule,
  MatSelectModule
} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './auth/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthInterceptor} from "./auth/auth-interceptor";
import { RepoComponent } from './auth/repo/repo.component';
import {ChartsModule} from "ng2-charts";
import { UserprofileComponent } from './userprofile/userprofile.component';
import { SearchComponent } from './search/search.component';
import { LikeComponent } from './like/like.component';
import { SocialLoginComponent } from './social-login/social-login.component';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider, LinkedinLoginProvider,
} from 'angular-6-social-login';
import { FilterComponent } from './filter/filter.component';
import { CommentComponent } from './comment/comment.component';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('Your-Facebook-app-id')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('982804554937-m0r0rl6rc917kksariha2prkl3lhh2d8.apps.googleusercontent.com')
        },
        {
          id: LinkedinLoginProvider.PROVIDER_ID,
          provider: new LinkedinLoginProvider('1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com')
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    PostEditComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    RepoComponent,
    UserprofileComponent,
    SearchComponent,
    LikeComponent,
    SocialLoginComponent,
    FilterComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgbModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ChartsModule,
    MatTabsModule,
    MatIconModule,
    SocialLoginModule,
    MatSelectModule,
    MatSidenavModule

  ],
  providers: [
      {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    { provide : AuthServiceConfig, useFactory: getAuthServiceConfigs }
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }

