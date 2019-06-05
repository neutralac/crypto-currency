import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-currency-row',
  templateUrl: './currency-row.component.html',
  styleUrls: ['./currency-row.component.scss']
})
export class CurrencyRowComponent {

  @Input() data: any = {};

}
