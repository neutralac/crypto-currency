import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyRowComponent } from './currency-grid/currency-row/currency-row/currency-row.component';
import { CurrencyGridComponent } from './currency-grid/currency-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyRowComponent,
    CurrencyGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
