import { Routes } from '@angular/router';
import { UserComponent } from './Components/user/user.component';
import { CreateFormComponent } from './Components/create-form/create-form.component';

export const routes: Routes = [
    {
        path:"",
        component:UserComponent
    },
    {
        path:"users",
        component:UserComponent
    },
    {
        path:"create-user",
        component:CreateFormComponent
    },
    {
        path:"user/:userId",
        component:CreateFormComponent
    }
];
