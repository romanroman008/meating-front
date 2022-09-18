import { _isTestEnvironment } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username!: String | null;
  public password!: String | null;


  constructor(private http:HttpClient) { }

  authenticationService(username: String,password:String){
    return this.http.get(environment.apiUrl + "/registration/test",
  { headers: {authorization:this.createBasicAuthToken(username,password)}})
  .pipe(map((res)=>{
    this.username=username;
    this.password=password;
    this.registerSuccesfulLogin(username,password);
  }));
  }

  createBasicAuthToken(username:String, password: String) {
   return 'Basic ' +window.btoa(username + ":" + password)
  }

  registerSuccesfulLogin(username:any, password:any) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME,username);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }


 
}