export class Transaction {
  public id: string;
  public transactionType: string;
  public transactionDate: Date;
  public category: string;
  public subCategory: string;
  public account: string;
  public payee: string;
  public amount: Number;
  public notes: string;
  // public receipt: [{ data: Buffer, contentType: string }];
  public createdAt: Date;
  public createdBy: string;
  public modifiedAt: Date;
  public modifiedBy: string;
  public approvedAt: Date;
  public approvedBy: string;
  public status: string;
}

export class Category {
  public id: string;
  public name: string;
  public parent: Date;
  public type: string;
  public createdAt: string;
}

export class Payee {
  public id: string;
  public name: string;
  public address: Date;
  public mobile: string;
  public notes: string;
  public createdAt: string;
}
