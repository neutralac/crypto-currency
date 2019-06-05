import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-details-page',
    templateUrl: './currency-details-page.component.html'
})
export class CurrencyDetailsPage {

    @Input() data: any = {};
}