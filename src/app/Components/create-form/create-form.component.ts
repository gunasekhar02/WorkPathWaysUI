import { Component, inject } from '@angular/core';
import { IUser,IUserDto } from '../../Interfaces/user';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
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
userForm=this.formBuilder.group({
  firstName:['',Validators.required],
  lastName:['',Validators.required],
  email:['',Validators.required],
  city:['',Validators.required]
});

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
         this.router.navigateByUrl("/users");
      }
    })
  }
}

}
