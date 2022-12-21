export class Expense {
  id: string;
  categoryCode: string;
  categoryName: string;
  subcategoryCode?: string;
  notes?: string;
  date: Date;
  recordType: string;
  isActive: boolean;
  createdBy: string;
  amount: number;

  constructor(
    id?: string,
    categoryCode?: string,
    categoryName?: string,
    date?: Date,
    isActive?: boolean,
    amount?: number,
    recordType?: string,
    notes?: string
  ) {
    this.id = id ?? '';
    this.categoryCode = categoryCode ?? '';
    this.categoryName = categoryName ?? '';
    this.subcategoryCode = '';
    this.date = date ?? new Date();
    this.isActive = isActive ?? true;
    this.createdBy = '';
    this.amount = amount ?? 0.0;
    this.recordType = recordType ?? '';
    this.notes = notes ?? '';
  }
}
