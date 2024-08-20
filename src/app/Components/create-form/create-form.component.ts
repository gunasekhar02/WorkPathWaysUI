import { Component, inject } from '@angular/core';
import { IUser,IUserDto } from '../../Interfaces/user';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [MatFormFieldModule,MatCardModule,MatButtonModule,RouterLink,FormsModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {
apiService=inject(ApiService);
formBuilder=inject(FormBuilder);
router=inject(Router);
route=inject(ActivatedRoute);
toaster=inject(ToastrService);
userForm=this.formBuilder.group({
  userId:['',[]],
  firstName:['',Validators.required],
  lastName:['',Validators.required],
  email:['',Validators.required],
  city:['',Validators.required]
});
  userId!: string;
  isEdit=false;

ngOnInit(){
this.userId=this.route.snapshot.params["userId"];
if(this.userId){
  this.isEdit=true;
}
this.apiService.getUserByuserId(this.userId).subscribe((res:any)=>{
 if(res.success && res.data!=null){
  this.userForm.patchValue(res.data);
 }
});
}

save(){
  if(this.userForm.value){
    const user:IUserDto={
      firstName:this.userForm.value.firstName!,
      lastName:this.userForm.value.lastName!,
      email:this.userForm.value.email!,
      city:this.userForm.value.city!
    }
    this.apiService.createUser(user).subscribe((res:any)=>{
      if(res.success){
         console.log(res);
         this.toaster.success('User Created Successfully.', 'Success', {
          toastClass: 'toast toast-success'
        });
         this.router.navigateByUrl("/users");
      }
    })
  }
}

update(){
  if(this.userForm.value){
    const user:IUser={
      userId:this.userForm.value.userId!,
      firstName:this.userForm.value.firstName!,
      lastName:this.userForm.value.lastName!,
      email:this.userForm.value.email!,
      city:this.userForm.value.city!
    }
    this.apiService.updateUser(user).subscribe((res:any)=>{
      if(res.success){
        this.toaster.success('User Updated Successfully.', 'Success', {
          toastClass: 'toast toast-success'
        });
         console.log(res);
         this.router.navigateByUrl("/users");
      }else{
        this.toaster.error('Something Went Wrong', 'Error', {
          toastClass: 'toast toast-error'
        });
      }
    })
  }
}

}
