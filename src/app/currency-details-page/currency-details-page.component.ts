import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CryptoCurrencyApiService } from '../services/crypto-currency-api/crypto-currency-api.service';
import { LoadingMaskService } from '../services/loading-mask/loading-mask.service';

@Component({
    selector: 'app-details-page',
    templateUrl: './currency-details-page.component.html',
    styleUrls: ['./currency-details-page.component.scss']
})
export class CurrencyDetailsPage implements OnInit {

    @Input() data: any;

    constructor(private route: ActivatedRoute,
        private currencyService: CryptoCurrencyApiService,
        private loadingMaskService: LoadingMaskService) {

    }

    public ngOnInit(): void {
        this.loadingMaskService.showLoadingMask();
        this.route.params.subscribe(this.onParamsChange.bind(this));
    }

    private onParamsChange(params: any) {
        let shortName = params.shortName;
        // this.currencyService.getSingleCurrencyData(shortName)
        //     .then(this.updateData.bind(this));
        let me = this;
        setTimeout(function () {
            me.data = {
                description: 'Bitcoin (BTC) is a consensus network that enables a new payment system and a completely digital currency. Powered by its users, it is a peer to peer payment network that requires no central authority to operate. On October 31st, 2008, an individual or group of individuals operating under the pseudonym "SatoshiNakamoto" published the Bitcoin Whitepaper and described it as: "apurelypeer-to-peerversionofelectroniccashwouldallowonlinepaymentstobesentdirectlyfromonepartytoanotherwithoutgoingthroughafinancialinstitution."',
                logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
                name: 'Bitcoin',
                website: 'https://bitcoin.org/'
            };
            me.loadingMaskService.hideLoadingMask();
        }, 1000);
    }

    public updateData(data: any) {
        debugger
    }
}