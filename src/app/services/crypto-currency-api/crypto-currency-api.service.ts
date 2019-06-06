
/**
 * Crypto currency API service
 * Contains functions for retrieving crypto currency data
 * 
 * @author Milan Vidojevic
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CryptoCurrencyApiService {

    /**
     * Object containing Crypto currency market URLS 
     * 
     * @type {Object}
     */
    private urls: any = {
        info: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
        quotes: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
    };

    constructor(private http: HttpClient) {

    }

    /**
     * Returns a Promise to be resolved once grid data get is finished
     * 
     * @return {Promise<Object>}
     */
    public getCryptoCurrencyData(): Promise<any> {
        // let observable: Observable<any> = this.http.get(this.urls.quotes);
        // return observable.toPromise();
        let observable = this.http.get('assets/data/grid-data.json');
        return observable.toPromise();
    }

    /**
     * Returns a Promise to be resolved once single crypto currency info data has been retrieved
     * 
     * @param {string} symbol 
     * 
     * @return {Promise<Object>}
     */
    public getSingleCurrencyData(symbol: string): Promise<any> {
        let headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application-json'
            })
        };
        let data = {
            symbol: symbol
        };
        let observable = this.http.post(this.urls.info, data, headers);
        return observable.toPromise();
    }

}