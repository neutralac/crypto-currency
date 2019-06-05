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

  public loading: boolean = true;

  constructor(private translateService: TranslateService,
    private loadingMaskService: LoadingMaskService) {
    this.translateService.use('en_US');
    this.loadingMaskService.loadingMaskToggle.subscribe(this.setLoading.bind(this));
  }

  private setLoading(loading: boolean): void {
    let me = this;
    setTimeout(function () {
      me.loading = loading;
    });
  }
}
