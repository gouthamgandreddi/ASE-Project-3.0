import { Injectable } from '@angular/core';
import {AuthDataModel} from "./auth-data-model";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {Router} from "@angular/router";
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any;
  private modelDataListner = new Subject<any>();
  private userIsAuthenticted =false;
  private authStatusListner = new Subject<boolean>();
  private tokenTimer:any;
<<<<<<< HEAD
    private messageSource = new BehaviorSubject(null);
    currentMessage = this.messageSource.asObservable();
  constructor(private http:HttpClient,private router:Router) { }
=======
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();


    constructor(private http:HttpClient,private router:Router) { }
>>>>>>> b333ed7f5cc3016a71d43803b46774706f7b2d5c

  getToken(){
    return this.token;
  }

  getIsAuth(){
      return this.userIsAuthenticted;
  }
  getAuthStatusListner(){
      return this.authStatusListner.asObservable();
  }
  getModelDataListner(){
      return this.modelDataListner.asObservable();
  }
  createUser(email:string,password:string){
    const authData: AuthDataModel = {
      email:email,
      password:password
    }
    return this.http.post<{message:string}>('http://localhost:3000/api/user/signup',authData)
        .pipe(map((res)=>{
          console.log('data after signup in service - ',res);
          return res.message;
        }))
  }
  login(email: string,password:string){
    const authData: AuthDataModel = {email:email, password:password};
    return this.http.post<{token:any,uname:string,expiresIn:number}>('http://localhost:3000/api/user/login',authData)
        .subscribe(response =>{
          console.log(response);
          const token = response.token;
          const expiresInDuration = response.expiresIn;
          this.tokenTimer = setTimeout(()=>{
                this.logout();
          },expiresInDuration * 1000); //calculated in millisec
          localStorage.setItem('username',response.uname);
          this.token =token;
          if(this.token){
              this.userIsAuthenticted =true;
              this.authStatusListner.next(true);
              const now = new Date();
              const expirationDate = new Date(now.getTime()  + (expiresInDuration * 1000));
              console.log(expirationDate);
              this.saveAuthData(response.token,expirationDate,response.uname);
              this.router.navigate(['/home']);
          }
        })
  }
  getExperiments(){
      console.log('experiments db');
      const a ='hi';
      return this.http.get('http://localhost:3000/api/expr/exi')
          .subscribe(result=>{
              console.log(result, 'in auth service');
          });
  }

  logout(){
      this.userIsAuthenticted = false;
      this.token = null;
      this.authStatusListner.next(false);
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.router.navigate(['/']);
  }

  private saveAuthData(token:string,expirationDate:Date,uname:string){
      localStorage.setItem('token',token);
      localStorage.setItem('expiration',expirationDate.toISOString());
      localStorage.setItem('username',uname);

  }
    private clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('username');
    }

    getRepo(title:string){
        console.log('experiments db');
        // const param = `?model_name=`+title;
        const model = {
            title:title
        };
        return this.http.post('http://localhost:3000/api/expr/exi',model)
            .pipe(map(result=>{
                console.log('in auth service - ' ,result);
                return result;
            }));
    }
<<<<<<< HEAD

=======
>>>>>>> b333ed7f5cc3016a71d43803b46774706f7b2d5c
    getSearchResult(title : string) {
        console.log('Searching Models - service');

        const model = {
            title:title
        };
        return this.http.post('http://localhost:3000/api/expr/searchingModels',model)
            .pipe(map(result=>{
                console.log('in auth service searching Models - ' ,result);
                return result;
            }));
    }

    changeMessage(message: any) {
        this.messageSource.next(message);
    }
<<<<<<< HEAD

=======
    // search v1 just for sample search model - alternate for prem
    // model(title:string){
    //     console.log('to experiments from auth service ');
    //     // const param = `?model_name=`+title;
    //     const model = {
    //         title:title
    //     };
    //     return this.http.post('http://localhost:3000/api/expr/searchModel',model)
    //         .subscribe(result=>{
    //             console.log('in auth service from db - ' ,result);
    //             this.modelDataListner.next(result);
    //             this.router.navigate(['/search']);
    //             return result;
    //         });
    // }
>>>>>>> b333ed7f5cc3016a71d43803b46774706f7b2d5c
}
