
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CryptoCurrencyApiService {

    private cryptoApiUrl: string = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';

    constructor(private http: HttpClient) {

    }

    public getCryptoCurrencyData(): Promise<any> {
        let observable: Observable<any> = this.http.get(this.cryptoApiUrl);
        return observable.toPromise();
    }

}