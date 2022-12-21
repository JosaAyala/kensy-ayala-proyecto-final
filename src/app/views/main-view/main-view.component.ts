import { Component, OnInit } from '@angular/core';
import { IncomeExpenseTrackingService } from 'src/app/income-expense-tracking.service';
import { Budget } from '../models/budget';
import { Expense } from '../models/expenses-model';
import { UserSettings } from '../models/user_settings';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  summaryBalance: {
    gastos: number;
    ingresos: number;
    currency: string;
  } = {
    gastos: 0,
    ingresos: 0,
    currency: '$',
  };

  userSettings: UserSettings = new UserSettings();

  budgets: Budget[] = [];

  records: Expense[] = [];

  constructor(
    private incomeExpenseTrackingService: IncomeExpenseTrackingService
  ) {}

  ngOnInit(): void {
    this.getBudgets();
    this.getRecords();
  }

  getRecords() {
    this.records = this.incomeExpenseTrackingService.get_registros();
  }

  getUserSettings() {
    this.incomeExpenseTrackingService.get_userSettings().subscribe((result) => {
      if (result.length > 0) {
        this.userSettings = new UserSettings(
          result[0]['id'],
          result[0]['currencyName'],
          result[0]['currencySymbol']
        );

        this.summaryBalance.currency = this.userSettings.currencySymbol;
      }
    });
  }

  getInitialInformation() {
    let incomes = 0.0;
    let expenses = 0.0;

    this.records = this.incomeExpenseTrackingService.get_registros();

    this.getBudgets();

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

  getBudgets() {
    this.incomeExpenseTrackingService.get_budgets().subscribe((result) => {
      if (result.length > 0) {
        let budgetDocs: Budget[] = [];
        result.forEach((doc) => {
          let budgetDoc = new Budget({ ...doc, isDefault: doc['default'] });
          budgetDocs.push(budgetDoc);
        });

        this.budgets = budgetDocs;
      }
    });
  }

  async updateFooter() {
    this.incomeExpenseTrackingService.get_budgets().subscribe((result) => {
      if (result.length > 0) {
        let budgetDocs: Budget[] = [];
        result.forEach((doc) => {
          let budgetDoc = new Budget({ ...doc, isDefault: doc['default'] });
          budgetDocs.push(budgetDoc);
        });

        this.budgets = budgetDocs;
        let registros: Expense[] = [];
        this.incomeExpenseTrackingService
          .get_records()
          .subscribe((docsResult) => {
            if (docsResult.length > 0) {
              docsResult.forEach((doc) => {
                let document = new Expense(
                  doc['id'],
                  doc['categoryCode'],
                  doc['categoryName'],
                  doc['date'].toDate(),
                  doc['isActive'],
                  doc['amount'],
                  doc['recordType'],
                  doc['notes']
                );

                registros.push(document);
              });
              this.records = registros;

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
          });
      }
    });
  }
}
