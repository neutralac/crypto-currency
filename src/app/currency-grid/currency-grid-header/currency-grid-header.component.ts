import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-currency-grid-header',
  templateUrl: './currency-grid-header.component.html',
  styleUrls: ['./currency-grid-header.component.scss']
})
export class CurrencyGridHeaderComponent {

  private localizationStrings: string[] = [
    'currency-grid-header.name',
    'currency-grid-header.shortName',
    'currency-grid-header.dollarValueOfSingleUnit',
    'currency-grid-header.last_24h',
    'currency-grid-header.amountYouOwn',
    'currency-grid-header.valueOfYourCoin'
  ];

  public translations: any = {};

  constructor(private translateService: TranslateService) {
    this.onLangChange();
    this.onLangChange = this.onLangChange.bind(this);
    this.translateService.onLangChange.subscribe(this.onLangChange);
  }


  private onLangChange() {
    this.translations = this.translateService.instant(this.localizationStrings);
  }
}
