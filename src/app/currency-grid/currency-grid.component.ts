/**
 * Crypto currency grid
 * Used to display crypto currency API data
 * 
 * @author Milan Vidojevic
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingMaskService } from '../services/loading-mask/loading-mask.service';
import { CryptoCurrencyApiService } from '../services/crypto-currency-api/crypto-currency-api.service';

@Component({
  selector: 'app-currency-grid',
  templateUrl: './currency-grid.component.html',
  styleUrls: ['./currency-grid.component.scss']
})
export class CurrencyGridComponent implements OnInit {

  private initialLoad: boolean = true;

  public gainValue: any;

  /**
   * Table display data
   * Updated by callijng crypto currency API on component init
   */
  public tableData: any[] = [];

  public paginationData: any = {
    pageSize: 10,
    allItems: []
  };

  constructor(private loadingMaskService: LoadingMaskService,
    private router: Router,
    private cryptoCurrencyService: CryptoCurrencyApiService) { }

  public ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    if (this.router.url == '/') {
      this.loadingMaskService.showLoadingMask();
      setTimeout(this.updateData.bind(this), 1000);
    }
  }

  public onPageChange(items): void {
    let me = this;
    setTimeout(function () {
      me.tableData = items;
    });
  }

  private setData(data: any) {
    this.paginationData = {
      allItems: data.data,
      pageSize: 10
    };
    if (this.initialLoad) {
      this.initialLoad = false;
      this.updateUserGainLossValue();
      this.updateStoredCurrencyData();
    }
    this.loadingMaskService.hideLoadingMask();
    setTimeout(this.getData.bind(this), 60000);
  }

  private updateStoredCurrencyData() {
    let currencyData = localStorage.getItem('currencyData')
    let data = currencyData ? JSON.parse(currencyData) : {};
    let item = this.paginationData.allItems.length;
    let currentItem;
    while (item) {
      item--;
      currentItem = this.paginationData.allItems[item];
      data[currentItem.symbol] = currentItem.price;
    }
    localStorage.setItem('currencyData', JSON.stringify(data));
  }

  private calculateGainLossValue(priceData: any): number {
    let sum = 0;
    let item = this.paginationData.allItems.length;
    let currentItem: any;
    let userCurrencyCount: number;
    while (item) {
      item--;
      currentItem = this.paginationData.allItems[item];
      userCurrencyCount = parseInt(localStorage.getItem(currentItem.symbol));
      if (userCurrencyCount) {
        sum += (currentItem.price - priceData[currentItem.symbol]) * userCurrencyCount;
      }
    }

    return sum;
  }

  private updateUserGainLossValue(): void {
    let gainValue: number;
    let previousEntry = localStorage.getItem('currencyData');
    if (previousEntry) {
      gainValue = this.calculateGainLossValue(JSON.parse(previousEntry));
    }
    this.gainValue = gainValue ? gainValue.toFixed(2) : 0;
  }

  public updateData() {
    this.cryptoCurrencyService.getCryptoCurrencyData()
      .then(this.setData.bind(this));
  }
}
