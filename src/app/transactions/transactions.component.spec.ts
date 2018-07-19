import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TransactionsComponent } from './transactions.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TransactionsComponent', () => {

  let fixture: ComponentFixture<TransactionsComponent>;
  let component: TransactionsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TransactionsComponent]
    });

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;

  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });

});
