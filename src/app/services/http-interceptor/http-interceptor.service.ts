/**
 * HTTP interceptor
 * Used to update crypto market API calls with auth key
 * 
 * @author Milan Vidojevic
 */
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import ENV from '../../ENV';

export class CryptoCurrencyApiHttpInterceptor implements HttpInterceptor {

    /**
     * @inheritdoc
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        if (req.url.indexOf('coinmarketcap') !== -1) {
            authReq = req.clone({
                headers: req.headers.set('X-CMC_PRO_API_KEY', ENV.cryptoCurrencyApiKey)
            });
        }
        return next.handle(authReq);
    }
}