import { Component, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { IUser } from '../../Interfaces/user';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
userList:IUser[]=[];
apiService=inject(ApiService);
displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'email','city'];
ngOnInit(){
   this.loadUsers();
}
loadUsers(){
  this.apiService.getAllUsers().subscribe((res: any)=>{
    if(res.success==true && res.errorMessage==null){
      this.userList = res.data;
    }
    console.log(res);
  })
}

}
