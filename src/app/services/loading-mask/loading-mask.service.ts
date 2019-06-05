import { EventEmitter } from '@angular/core';

export class LoadingMaskService {

    public loadingMaskToggle: EventEmitter<boolean> = new EventEmitter();

    public hideLoadingMask() {
        this.loadingMaskToggle.emit(false);
    }

    public showLoadingMask() {
        this.loadingMaskToggle.emit(true);
    }
}