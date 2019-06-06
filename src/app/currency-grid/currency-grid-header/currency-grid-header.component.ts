/**
 * Currency grid header component
 * 
 * @author Milan Vidojevic
 */
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-currency-grid-header',
  templateUrl: './currency-grid-header.component.html',
  styleUrls: ['./currency-grid-header.component.scss']
})
export class CurrencyGridHeaderComponent {

  /**
   * Array containing all localization string keys
   * 
   * @type {string[]}
   */
  private localizationStrings: string[] = [
    'currency-grid-header.name',
    'currency-grid-header.shortName',
    'currency-grid-header.dollarValueOfSingleUnit',
    'currency-grid-header.last_24h',
    'currency-grid-header.amountYouOwn',
    'currency-grid-header.valueOfYourCoin'
  ];

  /**
   * Object containing translated strings
   * 
   * @type {Object}
   */
  public translations: any = {};

  constructor(private translateService: TranslateService) {
    this.onLangChange();
    this.onLangChange = this.onLangChange.bind(this);
    this.translateService.onLangChange.subscribe(this.onLangChange);
  }

  /**
   * Translate service language change listener
   * Updates translations
   */
  private onLangChange(): void {
    this.translations = this.translateService.instant(this.localizationStrings);
  }
}
