import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { IncomeExpenseTrackingService } from 'src/app/income-expense-tracking.service';
import { Budget } from '../models/budget';
import { UserSettings } from '../models/user_settings';

@Component({
  selector: 'app-budget-view',
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.css'],
})
export class BudgetViewComponent implements OnInit {
  budgets: Budget[] = [];

  defaulBudget: Budget = new Budget();
  userSettings: UserSettings = new UserSettings();
  newBudget: Budget = new Budget();

  @Output() onUpdateFooter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private incomeExpenseTrackingService: IncomeExpenseTrackingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBudgets();
    this.getUserSettings();
  }

  openDialog(): void {
    this.newBudget.creationDate = new Date();
    this.newBudget.currencyName = this.userSettings.currencyName;
    this.newBudget.currencySymbol = this.userSettings.currencySymbol;

    const dialogRef = this.dialog.open(BudgetDialog, {
      data: this.newBudget,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getBudgets();
      this.newBudget = new Budget();
    });
  }

  getUserSettings() {
    this.incomeExpenseTrackingService.get_userSettings().subscribe((result) => {
      if (result.length > 0) {
        this.userSettings = new UserSettings(
          result[0]['id'],
          result[0]['currencyName'],
          result[0]['currencySymbol']
        );
      }
    });
  }

  getBudgets() {
    this.incomeExpenseTrackingService.get_budgets().subscribe((result) => {
      if (result.length > 0) {
        let budgetDocs: Budget[] = [];
        result.forEach((doc) => {
          let budgetDoc = new Budget({ ...doc, isDefault: doc['default'] });
          budgetDocs.push(budgetDoc);
        });

        this.budgets = budgetDocs.filter((x) => x.isDefault == false);
        this.defaulBudget = budgetDocs.filter((x) => x.isDefault == true)[0];
      }
    });
  }

  removeBudget(id: string) {
    this.incomeExpenseTrackingService
      .remove_budget(id)
      .then(() => {
        this.getBudgets();
        this.updateFooter();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async saveBudget(budget: Budget) {
    await this.incomeExpenseTrackingService.update_budget(budget);
    this.getBudgets();
    this.updateFooter();
  }

  updateFooter() {
    this.onUpdateFooter.emit();
  }
}

@Component({
  selector: 'budget-dialog',
  templateUrl: 'budget-dialog.html',
})
export class BudgetDialog {
  constructor(
    private incomeExpenseTrackingService: IncomeExpenseTrackingService,
    public dialogRef: MatDialogRef<BudgetDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Budget
  ) {}

  async createNewBudget() {
    await this.incomeExpenseTrackingService.add_nuevo_presupuesto(this.data);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
