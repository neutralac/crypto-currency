/**
 * Crypto currency details page
 * 
 * @author Milan Vidojevic
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CryptoCurrencyApiService } from '../services/crypto-currency-api/crypto-currency-api.service';
import { LoadingMaskService } from '../services/loading-mask/loading-mask.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-details-page',
    templateUrl: './currency-details-page.component.html',
    styleUrls: ['./currency-details-page.component.scss']
})
export class CurrencyDetailsPage implements OnInit, OnDestroy {

    /**
     * Data containing currency name, description, website
     * Updated by retrieving data via API call
     * 
     * @type {Object}
     */
    public data: any;

    /**
     * Route change subscription
     * Used to clean up route subscription in OnDestroy lifecycle
     * 
     * @type {Subscription}
     */
    private routeChangeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
        private currencyService: CryptoCurrencyApiService,
        private loadingMaskService: LoadingMaskService) {

    }

    /**
     * Angular lifecycle hook
     * Displays loading mask and registers route change listener 
     */
    public ngOnInit(): void {
        this.loadingMaskService.showLoadingMask();
        this.routeChangeSubscription = this.route.params.subscribe(this.onParamsChange.bind(this));
    }

    /**
     * Angular lifecycle hook
     * Removes route change subscription to prevent memory leak
     */
    public ngOnDestroy(): void {
        this.routeChangeSubscription.unsubscribe();
    }

    /**
     * Route params change listener
     * Loads currency data
     * 
     * @param {Object} params 
     */
    private onParamsChange(params: any): void {
        // let shortName = params.shortName;
        // this.currencyService.getSingleCurrencyData(shortName)
        //     .then(this.updateData.bind(this));

        // Faking data due to CORS permissions block on CoinMarket API side
        let data = {
            description: 'Bitcoin (BTC) is a consensus network that enables a new payment system and a completely digital currency. Powered by its users, it is a peer to peer payment network that requires no central authority to operate. On October 31st, 2008, an individual or group of individuals operating under the pseudonym "SatoshiNakamoto" published the Bitcoin Whitepaper and described it as: "apurelypeer-to-peerversionofelectroniccashwouldallowonlinepaymentstobesentdirectlyfromonepartytoanotherwithoutgoingthroughafinancialinstitution."',
            logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
            name: 'Bitcoin',
            website: 'https://bitcoin.org/'
        };
        setTimeout(this.updateData.bind(this, data), 1000);
    }

    /**
     * Updates page data to trigger change detection and hides loading mask
     * 
     * @param {Object} data 
     */
    public updateData(data: any): void {
        this.data = data;
        this.loadingMaskService.hideLoadingMask();
    }
}