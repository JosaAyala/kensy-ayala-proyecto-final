export class Budget {
  id: string;
  budgetName: string;
  creationDate: Date;
  currencyName: string;
  currencySymbol: string;
  budget: number;
  referencia!: string;
  isDefault: boolean;

  constructor(params?: {
    id?: string;
    budgetName?: string;
    creationDate?: Date;
    currencyName?: string;
    currencySymbol?: string;
    budget?: number;
    referencia?: string;
    isDefault?: boolean;
  }) {
    this.id = params?.id ?? '';
    this.budgetName = params?.budgetName ?? '';
    this.creationDate = params?.creationDate ?? new Date();
    this.currencyName = params?.currencyName ?? '';
    this.currencySymbol = params?.currencySymbol ?? '';
    this.budget = params?.budget ?? 0.0;
    this.referencia = params?.referencia ?? '';
    this.isDefault = params?.isDefault ?? false;
  }
}
