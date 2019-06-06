import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';;

export class TranslateServiceMock {
    public onLangChange = new EventEmitter();

    public instant() {
        return '';
    }

    public use() {
        return new Observable(observer => {
        });
    }
}