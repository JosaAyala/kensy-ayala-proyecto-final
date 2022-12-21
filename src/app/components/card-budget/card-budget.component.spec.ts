import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBudgetComponent } from './card-budget.component';

describe('CardBudgetComponent', () => {
  let component: CardBudgetComponent;
  let fixture: ComponentFixture<CardBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
