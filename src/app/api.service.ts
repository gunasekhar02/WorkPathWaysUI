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

  //user
  createUser(user:IUserDto){
    return this.http.post<IUserDto>(this.baseUrl+"User/AddUser",user)
  }
  

  getUserByuserId(userId:string){
    const url = `${this.baseUrl}User/getUserByUserId/${userId}`;
    return this.http.get<string>(url);
  }
  getAllUsers(){
    return this.http.get<IUser[]>(this.baseUrl + "User/GetAllUsers");
  }

  updateUser(user:IUser){
    return this.http.put<string>(this.baseUrl+"User/EditUser",user)
  }

  deleteUser(userId:string){
    const url = `${this.baseUrl}User/DeleteUserByUserId/${userId}`;
    return this.http.delete<string>(url);
  }

  //Experiance

  getExperianceByuserId(userId:string){
    const url = `${this.baseUrl}Experiance/GetExperianceByUserId/${userId}`;
    return this.http.get<string>(url);
  }

  //Desired Companies

  getDesiredCompaniesByuserId(userId:string){
    const url = `${this.baseUrl}DesiredCompanies/GetDesiredCompaniesByUserId/${userId}`;
    return this.http.get<string>(url);
  }


  //Accomplishments

  getAccomplishmentsByuserId(userId:string){
    const url = `${this.baseUrl}Accomplishments/GetAccomplismentsByUserId/${userId}`;
    return this.http.get<string>(url);
  }
}
