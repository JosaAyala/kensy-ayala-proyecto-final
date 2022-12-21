import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Budget } from 'src/app/views/models/budget';
import { Expense } from 'src/app/views/models/expenses-model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() summaryBalance: {
    gastos: number;
    ingresos: number;
    currency: string;
  } = {
    gastos: 0,
    ingresos: 0,
    currency: '$',
  };

  @Input() budgets: Budget[] = [];

  @Input() records: Expense[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  getSummary() {
    let incomes = 0.0;
    let expenses = 0.0;

    this.budgets.forEach((budget) => {
      incomes = incomes + budget.budget;
    });

    this.records.forEach((record) => {
      if (record.recordType === 'INCOME') {
        incomes = incomes + record.amount;
      }
      if (record.recordType === 'EXPENSE') {
        expenses = expenses + record.amount;
      }
    });

    this.summaryBalance.gastos = expenses;
    this.summaryBalance.ingresos = incomes;
  }
}
