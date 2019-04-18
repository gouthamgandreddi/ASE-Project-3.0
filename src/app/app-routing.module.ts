import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {RepoComponent} from "./auth/repo/repo.component";
import {AuthGuard} from "./auth/auth.guard";
import {HomeComponent} from "./auth/home/home.component";
import {UserprofileComponent} from "./userprofile/userprofile.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path: 'models',component:PostListComponent}, //models for displaying - change later
  {path: 'create',component:PostCreateComponent,canActivate:[AuthGuard]},
  {path:'edit/:postId', component:PostCreateComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'repo/:title',component:RepoComponent},
  {path:'home',component:HomeComponent},
  {path:'user',component:UserprofileComponent},
  {path:'*',component:HomeComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule{


}
