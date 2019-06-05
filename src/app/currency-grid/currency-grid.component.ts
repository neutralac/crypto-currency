/**
 * Crypto currency grid
 * Used to display crypto currency API data
 * 
 * @author Milan Vidojevic
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private loadingMaskService: LoadingMaskService,
    private router: Router) { }

  public ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    if (this.router.url == '/') {
      this.loadingMaskService.showLoadingMask();
      setTimeout(this.updateData.bind(this), 1000);
    }
  }

  public updateData() {
    this.tableData = [{
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
    this.loadingMaskService.hideLoadingMask();
    setTimeout(this.getData.bind(this), 60000);
  }
}
