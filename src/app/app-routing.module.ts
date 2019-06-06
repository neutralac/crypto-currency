/**
 * Main routing module
 * 
 * @author Milan Vidojevic
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyDetailsPage } from './currency-details-page/currency-details-page.component';
import { PageNotFound } from './page-not-found/page-not-found.component';
import { CurrencyGridComponent } from './currency-grid/currency-grid.component';

const routes: Routes = [{
  path: 'details/:shortName',
  component: CurrencyDetailsPage
}, {
  path: '',
  component: CurrencyGridComponent
}, {
  path: '**',
  component: PageNotFound
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
