/**
 * Main component
 * 
 * @author Milan Vidojevic
 */
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingMaskService } from './services/loading-mask/loading-mask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto-currency';

  /**
   * True if loading mask should be visible, false otherwise
   * 
   * @type {boolean}
   */
  public loading: boolean = true;

  constructor(private translateService: TranslateService,
    private loadingMaskService: LoadingMaskService) {
    this.translateService.use('en_US');
    this.loadingMaskService.loadingMaskToggle.subscribe(this.setLoading.bind(this));
  }

  /**
   * Sets loading timeout to update loading value
   * 
   * @param {boolean} loading 
   */
  private setLoading(loading: boolean): void {
    setTimeout(this.setLoadingValue.bind(this, loading));
  }

  /**
   * Sets loading value
   * 
   * @param {boolean} loading 
   */
  private setLoadingValue(loading: boolean): void {
    this.loading = loading;
  }
}
