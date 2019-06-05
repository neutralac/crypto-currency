import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TooltipModule } from 'ng2-tooltip-directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyRowComponent } from './currency-grid/currency-row/currency-row.component';
import { CurrencyGridComponent } from './currency-grid/currency-grid.component';
import { CurrencyGridHeaderComponent } from './currency-grid/currency-grid-header/currency-grid-header.component';
import { CurrencyInputComponent } from './currency-grid/currency-input/currency-input.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { SpanWithTooltip } from './global/span-with-tooltip/span-with-tooltip.component';

import { CryptoCurrencyApiHttpInterceptor } from './services/http-interceptor/http-interceptor.service';
import { CryptoCurrencyApiService } from './services/crypto-currency-api/crypto-currency-api.service';

import { CryptoCurrencyPipe } from './pipes/crypto-currency/crypto-currency.pipe';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CurrencyRowComponent,
    CurrencyGridComponent,
    LoadingIndicatorComponent,
    CurrencyGridHeaderComponent,
    CurrencyInputComponent,
    CryptoCurrencyPipe,
    SpanWithTooltip
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    TooltipModule
  ],
  providers: [
    CryptoCurrencyApiService,
    { provide: HTTP_INTERCEPTORS, useClass: CryptoCurrencyApiHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
