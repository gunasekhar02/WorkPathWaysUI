import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser,IUserDto } from './Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http=inject(HttpClient)
  baseUrl:string ="https://localhost:7148/";
  constructor() { 
  }
  getAllUsers(){
    return this.http.get<IUser[]>(this.baseUrl + "User/GetAllUsers");
  }

  createUser(user:IUserDto){
    return this.http.post<IUserDto>(this.baseUrl+"User/AddUser",user)
  }
}
