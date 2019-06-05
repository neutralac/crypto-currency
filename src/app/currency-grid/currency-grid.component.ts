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
  public tableData: any[] = [{
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 9283.92,
    percent_change_24h: 0.518894
  }];

  constructor() { }

  ngOnInit() {

    // TODO map data to avoid deep interpolation
  }

}
