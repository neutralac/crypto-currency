import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import data from 'src/app/ENV';

@Component({
  selector: 'app-currency-row',
  templateUrl: './currency-row.component.html',
  styleUrls: ['./currency-row.component.scss']
})
export class CurrencyRowComponent implements OnInit {

  @Input() even: boolean;

  @Input() data: any = {};

  @Input() last: boolean;

  constructor(private router: Router) {

  }

  public ngOnInit(): void {
    this.onAmmountOwnedChanged();
    let percent_change_24h = this.data.percent_change_24h;
    if (percent_change_24h > 0) {
      this.data.priceWentUp = true;
    } else if (percent_change_24h < 0) {
      this.data.percent_change_24h = 0 - percent_change_24h;
      this.data.priceWentUp = false;
    }
    this.data.percent_change_24h = `${this.data.percent_change_24h.toFixed(2)}%`;
  }

  public displayCurrencyDetailsPage() {
    this.router.navigateByUrl(`/details/${this.data.symbol}`);
  }

  public onAmmountOwnedChanged(): void {
    let ammount = localStorage.getItem(this.data.symbol);
    let newData = Object.assign({}, this.data);
    newData.valueOfYourCoin = this.data.price * parseInt(ammount);
    this.data = newData;
  }
}
