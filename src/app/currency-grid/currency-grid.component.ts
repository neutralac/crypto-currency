/**
 * Crypto currency grid
 * Used to display crypto currency API data
 * 
 * @author Milan Vidojevic
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CryptoCurrencyApiService } from '../services/crypto-currency-api/crypto-currency-api.service';
import { LoadingMaskService } from '../services/loading-mask/loading-mask.service';

@Component({
  selector: 'app-currency-grid',
  templateUrl: './currency-grid.component.html',
  styleUrls: ['./currency-grid.component.scss']
})
export class CurrencyGridComponent implements OnInit {

  /**
   * Value which user gained or lost since the last time he loaded app
   * 
   * @type {string/number}
   */
  public gainValue: string | number;

  /**
   * True if this component is loading for the first time, false otherwise
   * 
   * @type {boolean}
   */
  private initialLoad: boolean = true;

  /**
   * Object containing config data for pagination bar
   * 
   * @type {Object}
   */
  public paginationData: any = {
    pageSize: 10,
    allItems: []
  };

  /**
   * Table display data
   * Updated by calling crypto currency API on component init
   * 
   * @type {Object[]}
   */
  public tableData: any[] = [];

  constructor(private loadingMaskService: LoadingMaskService,
    private router: Router,
    private cryptoCurrencyService: CryptoCurrencyApiService) { }

  /**
   * Angular lifecycle hook
   * Triggers data get
   */
  public ngOnInit(): void {
    this.getData();
  }

  /**
   * Calculates user gain or loss depending on the passed previous priceData
   * 
   * @param {Object} priceData 
   * 
   * @return {number}
   */
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

  /**
   * Triggers data get but only if this component is active route else does nothing
   * This is to prevent automatic refresh from triggering when on some other page
   */
  private getData(): void {
    if (this.router.url == '/') {
      this.loadingMaskService.showLoadingMask();
      setTimeout(this.updateData.bind(this), 1000);
    }
  }

  /**
   * Pagination bar page change listener
   * Updates tableData
   * 
   * @param {Object[]} items 
   */
  public onPageChange(items: any[]): void {
    // Call setTimeout to avoid angular compilation error due to change detection update
    setTimeout(this.setItems.bind(this, items));
  }

  /**
   * Sets pagination bar data and if first load update gain loss value
   * 
   * @param {Object} data 
   */
  private setData(data: any): void {
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
    // Set refresh timer
    setTimeout(this.getData.bind(this), 60000);
  }

  /**
   * Sets tabledData value
   * 
   * @param {Object[]} items 
   */
  private setItems(items: any[]): void {
    this.tableData = items;
  }

  /**
   * Retrieves data from backend and updates display
   */
  public updateData(): void {
    this.cryptoCurrencyService.getCryptoCurrencyData()
      .then(this.setData.bind(this));
  }

  /**
   * Updates localStorage with currenct prices data for gain loss calculations
   */
  private updateStoredCurrencyData(): void {
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

  /**
   * Calculates and updates gain loss value
   */
  private updateUserGainLossValue(): void {
    let gainValue: number;
    let previousEntry = localStorage.getItem('currencyData');
    if (previousEntry) {
      gainValue = this.calculateGainLossValue(JSON.parse(previousEntry));
    }
    this.gainValue = gainValue ? gainValue.toFixed(2) : 0;
  }
}
