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
  public attachments: {
    name: string,
    uniqueName: string
  };
  public createdAt: Date;
  public createdBy: string;
  public modifiedAt: Date;
  public modifiedBy: string;
  public approvedAt: Date;
  public approvedBy: string;
  public status: string;

  //   constructor(id: string,
  //      transactionType: string,
  //      transactionDate: Date,
  //      category: string,
  //      subCategory: string,
  //      account: string,
  //      payee: string,
  //      amount: Number,
  //      notes: string,
  //      createdAt: Date,
  //      createdBy: string,
  //      modifiedAt: Date,
  //      modifiedBy: string,
  //      approvedAt: Date,
  //      approvedBy: string) {
  //       this.id = id;
  //       this.transactionType = transactionType;
  //       this.transactionDate = transactionDate;
  //       this.category = category;
  //       this.subCategory = subCategory;
  //       this.account = account;
  //       this.payee = payee;
  //       this.amount = amount;
  //       this.notes = notes;
  //       this.createdAt = createdAt;
  //       this.createdBy = createdBy;
  //       this.modifiedAt = modifiedAt;
  //       this.modifiedBy = modifiedBy;
  //       this.approvedAt = approvedAt;
  //       this.approvedBy = approvedBy;
  //       this.status = status;
  // }
}

export class Category {
  public id: string;
  public name: string;
  public parent: string;
  public type: string;
  public createdAt: string;

  constructor(id: string,
    name: string,
    parent: string,
    type: string,
  ) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.type = type;
  }

}

export class Payee {
  public id: string;
  public name: string;
  public address: string;
  public mobile: string;
  public notes: string;
  public createdAt: string;

  constructor(id: string,
    name: string,
    address: string,
    mobile: string,
    notes: string
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.mobile = mobile;
    this.notes = notes;
  }

}
