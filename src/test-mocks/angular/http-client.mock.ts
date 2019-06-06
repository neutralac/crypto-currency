import { Observable } from 'rxjs';

export class HttpClientMock {
    public get() {
        return new Observable(observer => {
        });
    }

    public post() {
        return new Observable(observer => {
        });
    }
}