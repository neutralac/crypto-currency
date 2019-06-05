import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-row',
  templateUrl: './currency-row.component.html',
  styleUrls: ['./currency-row.component.scss']
})
export class CurrencyRowComponent implements OnInit {

  @Input() even: boolean;

  @Input() data: any = {};

  public ngOnInit(): void {
    this.onAmmountOwnedChanged();
  }

  public onAmmountOwnedChanged(): void {
    let ammount = localStorage.getItem(this.data.symbol);
    let newData = Object.assign({}, this.data);
    newData.valueOfYourCoin = this.data.price * parseInt(ammount);
    this.data = newData;
  }
}
