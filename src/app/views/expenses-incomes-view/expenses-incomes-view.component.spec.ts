import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesIncomesViewComponent } from './expenses-incomes-view.component';

describe('ExpensesIncomesViewComponent', () => {
  let component: ExpensesIncomesViewComponent;
  let fixture: ComponentFixture<ExpensesIncomesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesIncomesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesIncomesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
