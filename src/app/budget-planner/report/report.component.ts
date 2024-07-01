import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IncomeComponent } from '../income/income.component';
import { ExpenseComponent } from '../expense/expense.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, IncomeComponent, ExpenseComponent],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  incomeData: any[] = [];
  expenseData: any[] = [];
  displayedColumns: string[] = ['month', 'totalIncome', 'totalExpense'];
  dataSource: any[] = [];

  constructor(private incomeComponent: IncomeComponent, private expenseComponent: ExpenseComponent) {}

  ngOnInit(): void {
    this.loadData();
    this.generateReport();
    this.renderChart();
  }

  loadData() {
    this.incomeData = [
      { month: 'January', incomes: this.incomeComponent.januaryIncomes },
      { month: 'February', incomes: this.incomeComponent.februaryIncomes },
      { month: 'March', incomes: this.incomeComponent.marchIncomes }
    ];

    this.expenseData = [
      { month: 'January', expenses: this.expenseComponent.januaryExpense },
      { month: 'February', expenses: this.expenseComponent.februaryExpense },
      { month: 'March', expenses: this.expenseComponent.marchExpense },
      { month: 'June', expenses: this.expenseComponent.juneExpense }
    ];
  }

  generateReport() {
    this.dataSource = this.incomeData.map(income => {
      const totalIncome = income.incomes.reduce((acc: number, curr: any) => acc + curr.amount, 0);
      const expenses = this.expenseData.find(expense => expense.month === income.month);
      const totalExpense = expenses ? expenses.expenses.reduce((acc: number, curr: any) => acc + curr.expenseAmount, 0) : 0;
      return { month: income.month, totalIncome, totalExpense };
    });
  }

  renderChart() {
    const months = this.dataSource.map(data => data.month);
    const incomeData = this.dataSource.map(data => data.totalIncome);
    const expenseData = this.dataSource.map(data => data.totalExpense);

    const ctx = document.getElementById('reportChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Total Income',
            data: incomeData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Total Expense',
            data: expenseData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
