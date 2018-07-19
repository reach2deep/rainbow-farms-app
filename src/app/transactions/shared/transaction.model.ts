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
