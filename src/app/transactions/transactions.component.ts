import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'
//  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent implements OnInit {
  constructor(private router: Router) {

    console.log('TransactionsComponent Loaded');

  }

  ngOnInit() {
    console.log('configured routes: ', this.router.config);
  }
}
