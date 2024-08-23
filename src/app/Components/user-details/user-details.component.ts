import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../api.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatListModule, RouterLink,NgFor,MatCardModule,MatIcon,MatTooltip],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  userId!: string;
  listUserExperiance: any[] = [];
  listUserDesiredCompanies: any[] = [];
  listUserAccomplishments:any[]=[];
  apiService = inject(ApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.loadExperiance();
    this.loadDesiredCompanies();
    this.loadAccomplishments();
  }

  //Experiance
  loadExperiance(){
    this.apiService.getExperianceByuserId(this.userId).subscribe((res: any) => {
      if (res.success && res.data != null) {
        this.listUserExperiance = res.data;
      }
    });
  }
  onExpAdd(){
    console.log(this.userId);

  }
  onExpEdit(){
    console.log(this.userId);

  }

  onExpDelete(id:string){
console.log(id);
  }

  //Desired Companies
loadDesiredCompanies(){
  this.apiService.getDesiredCompaniesByuserId(this.userId).subscribe((res: any) => {
    if (res.success && res.data != null) {
      this.listUserDesiredCompanies = res.data;
    }
  });
}
onDesiredCompaniesAdd(){
  console.log(this.userId);

}
onDesiredCompaniesEdit(){
  console.log(this.userId);

}

onDesiredCompaniesDelete(id:string){
  console.log(id);
    }

//AccomplishMents

  loadAccomplishments(){
    this.apiService.getAccomplishmentsByuserId(this.userId).subscribe((res: any) => {
      if (res.success && res.data != null) {
        this.listUserAccomplishments = res.data;
      }
    });
}

onAccomplishmentAdd(){
  console.log(this.userId);
}

    onAccomplishmentEdit(){
      console.log(this.userId);

    }
    onAccomplishmentDelete(id:string){
      console.log(id);
        }

}
