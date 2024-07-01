import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: string;
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 1500 },
    { month: 'February', expenseAmount: 2000 },
    { month: 'March', expenseAmount: 1800 },
    { month: 'June', expenseAmount: 0 }
  ];
  monthSelected: boolean = false;
  januaryExpense: any[] = [
   
  ];
  februaryExpense: any[] = [
    
  ];
  marchExpense: any[] = [
   
  ];
  juneExpense: any[] = [
    
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });

    // Load expenses from local storage if available
    this.loadExpensesFromLocalStorage();
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.saveExpensesToLocalStorage();
      this.expenseForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      case 'June':
          return this.juneExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  onSave() {
    if (this.expenseForm.valid) {
      this.expenseForm.reset({ month: this.selectedMonth });
      this.saveExpensesToLocalStorage();
      this.getFilteredExpenses();
    }
  }

  saveForm() {
    alert("Form saved!")
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  saveExpensesToLocalStorage() {
    const expenses = {
      januaryExpense: this.januaryExpense,
      februaryExpense: this.februaryExpense,
      marchExpense: this.marchExpense,
      juneExpense: this.juneExpense
    };
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  loadExpensesFromLocalStorage() {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      const expenses = JSON.parse(storedExpenses);
      this.januaryExpense = expenses.januaryExpense || [];
      this.februaryExpense = expenses.februaryExpense || [];
      this.marchExpense = expenses.marchExpense || [];
      this.juneExpense = expenses.juneExpense || [];
    } 
  }
}
