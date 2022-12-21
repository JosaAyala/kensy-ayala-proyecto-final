export class Balance {
  recordType: string;
  categoryName: string;
  amount: number;
  
  constructor(recordType?: string, categoryName?: string, amount?: number) {
    this.recordType = recordType ?? '';
    this.categoryName = categoryName ?? '';
    this.amount = amount ?? 0;
  }
}
