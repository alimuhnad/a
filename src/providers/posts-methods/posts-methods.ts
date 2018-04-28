import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the PostsMethodsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsMethodsProvider {
data:any
  constructor(public http: Http) {
    console.log('Hello PostsMethodsProvider Provider');
  }


  createReview(review){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:8080/api/reviews', JSON.stringify(review), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }



 
 
  login(review){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    return this.http.post('http://localhost:8080/api/login', JSON.stringify(review), {headers: headers})
 
  }
    
 
  regs(review){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
   return this.http.post('http://localhost:8080/api/regs', JSON.stringify(review), {headers: headers})
     
 
  }
}
