/**
 * Crypto currency grid
 * Used to display crypto currency API data
 * 
 * @author Milan Vidojevic
 */
import { Component, OnInit } from '@angular/core';
import { LoadingMaskService } from '../services/loading-mask/loading-mask.service';

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

  constructor(private loadingMaskService: LoadingMaskService) { }

  ngOnInit() {
    this.loadingMaskService.showLoadingMask();
    let me = this;
    setTimeout(function () {
      me.tableData = [{
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 9283.92,
        percent_change_24h: 0.518894
      }, {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 9283.92,
        percent_change_24h: 0.518894
      }, {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 9283.92,
        percent_change_24h: 0.518894
      }, {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 9283.92,
        percent_change_24h: 0.518894
      }];
      me.loadingMaskService.hideLoadingMask();
    }, 1000);
  }

}
