import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import * as data from '../../../assets/configs-system.json';
import { Category } from '../models/category';
import { Expense } from '../models/expenses-model';
import { IncomeExpenseTrackingService } from '../../income-expense-tracking.service';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { Budget } from '../models/budget';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-expenses-incomes-view',
  templateUrl: './expenses-incomes-view.component.html',
  styleUrls: ['./expenses-incomes-view.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExpensesIncomesViewComponent implements OnInit {
  configs: any;
  model: Expense = new Expense();

  @Output() onUpdateFooter: EventEmitter<any> = new EventEmitter<any>();

  categorias: Category[] = [];

  isCreating: boolean = false;
  isEditing: boolean = false;

  records: Expense[] = [];
  budgets: Budget[] = [];
  mainBudget: Budget = new Budget();

  constructor(
    private incomeExpenseTrackingService: IncomeExpenseTrackingService // private incomeExpenseTrackingService: IncomeExpenseTrackingService
  ) {
    this.configs = data;
  }

  ngOnInit(): void {
    this.getRecords();
    this.getBudgets();
    this.updateFooter();
  }

  getRecords() {
    this.records = this.incomeExpenseTrackingService.get_registros();
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
        this.mainBudget = budgetDocs.filter((x) => x.isDefault === true)[0];
      }
    });
  }

  onSelectRecordType(recordType: string) {
    this.categorias = [];

    this.categorias =
      this.incomeExpenseTrackingService.get_categorias(recordType);
  }

  onSelectCategory(categoryId: string) {
    this.model.categoryName = this.categorias.filter(
      (x) => x.id === categoryId
    )[0].name;
  }

  onClickSave() {
    if (this.isCreating) {
      this.incomeExpenseTrackingService
        .add_nuevo_registro(this.model)
        .then((result) => {
          console.log(result.id);

          if (result.id && result.id !== null) {
            this.getRecords();
            this.model = new Expense();
            this.isCreating = false;
            this.isEditing = false;
          }
        })
        .catch((error) => console.error(error));
    }
    if (this.isEditing) {
      this.incomeExpenseTrackingService
        .update_record(this.model)
        .then((result) => {
          this.getRecords();
          this.model = new Expense();
          this.isCreating = false;
          this.isEditing = false;

          this.updateFooter();
        })
        .catch((error) => console.error(error));
    }
  }

  onClickNewRecord() {
    this.isCreating = true;
  }
  onClickRemove(id: string) {
    this.incomeExpenseTrackingService
      .remove_record(id)
      .then(() => {
        this.getBudgets();
        this.getRecords();
        this.updateFooter();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onClickCancel() {
    this.isCreating = false;
    this.isEditing = false;
  }

  onClickUpdate(data: Expense) {
    this.model = data;
    this.isEditing = true;
    this.categorias = this.incomeExpenseTrackingService.get_categorias(
      data.recordType
    );

    this.updateFooter();
  }

  updateFooter() {
    this.onUpdateFooter.emit();
  }
}
