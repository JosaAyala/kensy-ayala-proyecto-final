export class Category {
  id?: string | any;
  name: string | any;
  isActive: boolean | any;
  createdBy: string | any;
  recordTypeCode: string | any;

  /**
   *
   */
  constructor(params: ICategory | any) {
    this.id = params.id;
    this.name = params.name;
    this.isActive = params.isActive;
    this.createdBy = params.createdBy;
    this.recordTypeCode = params.recordTypeCode;
  }
}

export interface ICategory {
  id: string;
  name: string;
  isActive: boolean;
  createdBy: string;
  recordTypeCode: string;
}
