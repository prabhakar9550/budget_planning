import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  // Income
  lastMonthsIncome = ['January: $1000', 'February: $1500', 'March: $1200', 'June: $999'];
  currentMonthIncome = '$0';

  // Expense
  lastMonthsExpense: string[] = ['January: ', 'February: ', 'March: '];
  currentMonthExpense: number = 0;

  // Todo Trans
  todoTransactions = [
    { description: 'Pay electricity bill' },
    { description: 'Submit monthly report' },
    { description: 'Buy groceries' },
    { description: 'Call insurance company' }
  ];

  // Total
  totalCurrentMonthIncome = 2000;
  totalCurrentMonthExpense = 1500;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.loadExpensesFromLocalStorage();
  }

  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }

  onExpense() {
    this.router.navigate(['/budget-planner/expense']);
  }

  onTodo() {
    this.router.navigate(['/budget-planner/todo']);
  }

  // Calculate Total
  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }

  loadExpensesFromLocalStorage() {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      const expenses = JSON.parse(storedExpenses);
      console.log(expenses)
      this.lastMonthsExpense = [
        `January: $${this.calculateTotalExpense(expenses.januaryExpense)}`,
        `February: $${this.calculateTotalExpense(expenses.februaryExpense)}`,
        `March: $${this.calculateTotalExpense(expenses.marchExpense)}`,
        `June: $${this.calculateTotalExpense(expenses.juneExpense)}`
      ];
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      switch (currentMonth) {
        case 'January':
          this.currentMonthExpense = this.calculateTotalExpense(expenses.januaryExpense);
          break;
        case 'February':
          this.currentMonthExpense = this.calculateTotalExpense(expenses.februaryExpense);
          break;
        case 'March':
          this.currentMonthExpense = this.calculateTotalExpense(expenses.marchExpense);
          break;
        case 'June':
            this.currentMonthExpense = this.calculateTotalExpense(expenses.juneExpense);
            break;
        default:
          this.currentMonthExpense = 0;
      }
      this.totalCurrentMonthExpense = this.currentMonthExpense;
    }
  }

  calculateTotalExpense(expenses: { expenseType: string, expenseAmount: number }[]): number {
    return expenses.reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }
}


