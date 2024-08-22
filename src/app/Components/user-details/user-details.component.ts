import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../api.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatListModule, RouterLink,NgFor],
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

  loadExperiance(){
    this.apiService.getExperianceByuserId(this.userId).subscribe((res: any) => {
      if (res.success && res.data != null) {
        this.listUserExperiance = res.data;
      }
    });
  }

loadDesiredCompanies(){
  this.apiService.getDesiredCompaniesByuserId(this.userId).subscribe((res: any) => {
    if (res.success && res.data != null) {
      this.listUserDesiredCompanies = res.data;
    }
  });
}
  loadAccomplishments(){
    this.apiService.getAccomplishmentsByuserId(this.userId).subscribe((res: any) => {
      if (res.success && res.data != null) {
        this.listUserAccomplishments = res.data;
      }
    });
}

}
