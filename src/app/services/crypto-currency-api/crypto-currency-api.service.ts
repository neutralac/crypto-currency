
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CryptoCurrencyApiService {

    private urls: any = {
        info: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
        quotes: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
    };

    constructor(private http: HttpClient) {

    }

    public getCryptoCurrencyData(): Promise<any> {
        let observable: Observable<any> = this.http.get(this.urls.quotes);
        return observable.toPromise();
    }

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