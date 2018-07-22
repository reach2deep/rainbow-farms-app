import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-view',
  templateUrl: './number-view.component.html',
  styleUrls: ['./number-view.component.scss']
})

export class NumberViewComponent implements OnInit {

  // operation: String[] = ['', '', ''];
  displayNumber = '';
  // subDisplay: String = '';
  // activeBuildingNumber  = '';

  ngOnInit(): void {
  }


  buildNumber(num: String): void {
    console.log(num);

    this.displayNumber += num;
  }
}
