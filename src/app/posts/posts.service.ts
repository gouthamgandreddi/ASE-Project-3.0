import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {parseHttpResponse, post} from 'selenium-webdriver/http';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsUpdated = new Subject<{posts:Post[],postCount:number}>();
  private posts:Post [] = [];
  token;
  userData;
    headerOption = 'Authorization'+ `Bearer ${this.token}`;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers':'Origin'
        }),
        };
  constructor(private http:HttpClient,private router:Router,
              private authService:AuthService) { }

  getPosts(postsPerPage:number,currentPage:number){
      const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&username=${localStorage.getItem('username')}`;
   console.log(queryParams);
    this.http.get<{message:string,posts:any,maxPosts:number}>('http://localhost:3000/api/posts'+queryParams)
      .pipe(map((postData)=>{
        console.log(postData,'postData');
        return {
                posts:postData.posts.map(post =>{
                  return {
                    title: post.title,
                    content: post.content,
                    id:post._id,
                      imagePath:post.imagePath
                  };
                }),
            maxPosts:postData.maxPosts
        };
      }))
      .subscribe((transformedPostData) =>{
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({posts:[...this.posts],postCount:transformedPostData.maxPosts});
      });
  }

    getModelInfo(title){
        const queryParams = `?title=${title}`;
        console.log(queryParams);
        return this.http.get<{message:string,model:any}>('http://localhost:3000/api/posts/postid'+queryParams)
            .pipe(map((modelResult)=>{
                console.log('message for repo result - ',modelResult.message );
                console.log(modelResult.model);
                return  modelResult.model
            }))
    }
  deletePosts(postId: string){
    console.log('service -',postId);
    return this.http.delete('http://localhost:3000/api/posts/'+postId);
      // .subscribe(()=>{
      //   console.log("Deleted");
      //   this.getPosts();
      // })
  }
  getPostUpdatelistner(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return {...this.posts.find(p =>p.id === id)};
  }

  updatePost(id:string,title:string,content:string,image:string, username: string,category:string,githubUrl,dataLink){

    // const post: Post =
    //     {id:id,title:title,content:content,imagePath:image};
    const updateData = new FormData();
    updateData.append('title',title);
      updateData.append('content',content);
      updateData.append('image',image,title);
      updateData.append('githubUrl',githubUrl);
      updateData.append('dataLink',dataLink);

      updateData.append('username',username);
      updateData.append('username',category);
      console.log(updateData,' -updated data')
    this.http.put('http://localhost:3000/api/posts/'+id,updateData)
      .subscribe(response => {
        // this.getPosts();
        // console.log('response',response);
        this.router.navigate(['/']);
      });
  }
  addPosts(title:string,content:string,image:File, username:string,category:string,githubUrl, dataLink){
      const postData = new FormData();
      postData.append('title',title);
      postData.append('content',content);
      postData.append('image',image,title);
      postData.append('username', username);
      postData.append('githubUrl',githubUrl);
      postData.append('dataLink',dataLink);
      postData.append('category', category);
      console.log('postData service post - ',postData );
    // var post:Post ={id:null,title:title,content:content};
    this.http.post<{message:string,postId:string}>('http://localhost:3000/api/posts', postData)
      .subscribe((responseData) =>{
        // const post:Post ={
        //     id:responseData.postId,
        //     title:title,
        //     content:content,
        //     imagePath:responseData.postId
        // };
        // console.log('new post with  id', post);
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      },error =>{
        console.log(error);
      })
  }




  //fileupload
    uploadfile(image:string,modelName:string){
        const postData = new FormData();
        postData.append('image',image);
        const queryParams = `?modelName=${modelName}`;
        console.log('upload service   - ',postData );
        return this.http.post<{message:string,file:any}>('http://localhost:3000/api/posts/uploader'+queryParams, postData)
            .pipe(map((responseData) =>{
                console.log(responseData.file,' -  filename');
                return responseData;
            },error =>{
                console.log(error);
            }))
    }

    //file listing
    getFilesList(modelName:string){
        console.log('list files  service',modelName );
        const queryParams = `?modelName=${modelName}`;
        console.log('query params - ', queryParams);
        return this.http.get('http://localhost:3000/api/posts/files'+queryParams)
            .pipe(map(res => {
                    console.log(res, ' -  filename');
                    return res;
                })
            )
    }


    // get single file
    getFileService(fileFname:string){
        const queryParams = `?filename=${fileFname}`;
        console.log('upload service   - ',fileFname );
        this.http.get<{message:string,file:any}>('http://localhost:3000/api/posts/files/'+queryParams)
            .subscribe((responseData) =>{
                console.log(responseData.file,' -  filename');
                this.router.navigate(['/repo/LST']); // make change
            },error =>{
                console.log(error);
            })
    }

    deleteFileService(filename:string){
        const queryParams = `?filename=${filename}`;
        console.log('before sending - delete service  file name  - ',filename );
        return this.http.delete('http://localhost:3000/api/posts/files/'+queryParams)
            .pipe(map((responseData) =>{
                console.log(responseData,' -  response after delete - service filename');
                this.router.navigate(['/repo/LST']); // make change
            },error =>{
                console.log(error);
            })
            )
    }

    downloadFileService(filename:string,filetype:string){
      console.log('filename in server for download - ', filename);
        const queryParams = `?filename=${filename}`;
        console.log('query params before sending -  ',queryParams)
        return this.http.get('http://localhost:3000/api/posts/files/download'+queryParams,
            {responseType:'blob'});
            // .pipe(map((responseData) =>{
            //     console.log(responseData,' -  response after download - service filename');
            //     this.router.navigate(['/repo/LST']); // make change
            //     return responseData;
            // },error =>{
            //     console.log(error);
            // }))
    }

    login(uname:string,password:string){
      console.log(uname,password,'- at service');
      const logindata = new FormData();
      logindata.append('uname',uname);
      logindata.append('password',password);
      console.log('login data after form - ',logindata);
      this.http.post<{message:string}>('http://localhost:3000/api/posts/login',logindata)
          .subscribe((res)=>{
              console.log('data after login from db with JWT token - ',res);
              this.token=res.message;
          })
  }

  public getUserInfo(){

      console.log(this.token,'token value in button ');
      console.log(      this.http.post<{message:string,userInfo:any}>('http://localhost:3000/api/posts/userinfo',this.token
          ,{
          headers:({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
              'Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,Authorization'
          })
      }));
      this.http.post<{message:string,userInfo:any}>('http://localhost:3000/api/posts/userinfo',this.token
          ,{headers:{
                  'Authorization': `Bearer ${this.token}`
              }})
          .subscribe(res =>{
              console.log(res,' - res in server');
              this.userData = res.userInfo;
              return res;
          })
  }

  getHeaders(){
       var  headers = new HttpHeaders();
      headers.append('Authorization',`Bearer ${this.token}`);
      console.log(headers.append('Authorization',`Bearer ${this.token}`));
      console.log(headers,'headers');
      return headers;
  }
}
