import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BudgetPlannerServiceService } from '../budget-planner-service.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  username: string = '';
  isSlideOut = true;
  constructor(
    private router: Router,
    private budgetPlannerService: BudgetPlannerServiceService
  ){}

  ngOnInit(): void {
    const user = this.budgetPlannerService.getLoggedInUser();
    this.username = user.username || '';
   
  }

  toggleSlideOut(): void {
    this.isSlideOut = !this.isSlideOut;
  }
  onDash(){
    this.router.navigate(['/budget-planner/dashboard']);
  }
  onProfile(){
    this.router.navigate(['/budget-planner/profile']);
  }
  onHistory(){
    this.router.navigate(['/budget-planner/history']);
  }
  onLogout(){
    this.router.navigate(['/budget-planner/login']);
  }
}
