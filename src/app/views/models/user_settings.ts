export class UserSettings {
  id: string;
  currencyName: string;
  currencySymbol: string;

  constructor(id?: string, currencyName?: string, currencySymbol?: string) {
    this.id = id ?? '';
    this.currencyName = currencyName ?? '';
    this.currencySymbol = currencySymbol ?? '';
  }
}
