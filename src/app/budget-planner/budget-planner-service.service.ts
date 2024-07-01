import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetPlannerServiceService {

  private loggedInUser: any;

  setLoggedInUser(user: any) {
    this.loggedInUser = user;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser() {
    if (!this.loggedInUser) {
      this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    }
    return this.loggedInUser;
  }

 
}
