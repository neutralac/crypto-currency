/**
 * Crypto currency grid
 * Used to display crypto currency API data
 * 
 * @author Milan Vidojevic
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-grid',
  templateUrl: './currency-grid.component.html',
  styleUrls: ['./currency-grid.component.scss']
})
export class CurrencyGridComponent implements OnInit {

  /**
   * Table display data
   * Updated by callijng crypto currency API on component init
   */
  public tableData: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
