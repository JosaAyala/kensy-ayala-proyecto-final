import { Component, OnInit } from '@angular/core';
import { IncomeExpenseTrackingService } from 'src/app/income-expense-tracking.service';
import { Balance } from '../models/balance';
import { Category } from '../models/category';
import { Expense } from '../models/expenses-model';

@Component({
  selector: 'app-balance-view',
  templateUrl: './balance-view.component.html',
  styleUrls: ['./balance-view.component.css'],
})
export class BalanceViewComponent implements OnInit {
  balance: Balance[] = [];
  records: Expense[] = [];
  categories: Category[] = [];
  displayedColumns: string[] = ['recordType', 'categoryName', 'amount'];
  constructor(
    private incomeExpenseTrackingService: IncomeExpenseTrackingService
  ) {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.incomeExpenseTrackingService
      .get_all_categorias()
      .subscribe((documents) => {
        let categorias: Category[] = [];

        documents.forEach((doc) => {
          let document = new Category({ ...doc });

          categorias.push(document);
        });
        
        this.categories = categorias;

        this.incomeExpenseTrackingService.get_records().subscribe((result) => {
          if (result.length > 0) {
            let registros: Expense[] = [];
            result.forEach((doc) => {
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

            let itemsBalance: Balance[] = [];

            this.categories.forEach((category) => {
              let item: Balance = new Balance();
              item.categoryName = category.name;
              item.recordType =
                category.recordTypeCode === 'INCOME' ? 'INGRESO' : 'GASTO';

              let amountCategory = 0;

              this.records.forEach((record) => {
                if (record.categoryCode === category.id) {
                  amountCategory = amountCategory + record.amount;
                }
              });

              item.amount = amountCategory;
              itemsBalance.push(item);
            });

            this.balance = itemsBalance;
          }
        });
      });
  }
}
