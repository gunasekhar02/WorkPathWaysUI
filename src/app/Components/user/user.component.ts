import { Component, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { IUser } from '../../Interfaces/user';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
userList:IUser[]=[];
router=inject(Router);
apiService=inject(ApiService);
toaster=inject(ToastrService);
displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'email','city','actions-edit','actions-delete'];
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


onDelete(userId:string){
  this.apiService.deleteUser(userId).subscribe((res: any)=>{
    if(res.success==true && res.errorMessage==null){
      console.log(res);
      this.toaster.success('User Deleted Successfully.', 'Success', {
        toastClass: 'toast toast-success'
      });
      this.loadUsers();
    }
    console.log(res);
  })
}

onEdit(userId:string){
 this.router.navigateByUrl("/user/"+userId);
}
}
