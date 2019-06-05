import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyRowComponent } from './currency-grid/currency-row/currency-row.component';
import { CurrencyGridComponent } from './currency-grid/currency-grid.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { CurrencyGridHeaderComponent } from './currency-grid/currency-grid-header/currency-grid-header.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CurrencyInputComponent } from './currency-grid/currency-input/currency-input.component';

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
    CurrencyInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
