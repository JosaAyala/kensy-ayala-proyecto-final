import { TestBed } from '@angular/core/testing';

import { IncomeExpenseTrackingService } from './income-expense-tracking.service';

describe('IncomeExpenseTrackingService', () => {
  let service: IncomeExpenseTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeExpenseTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
