/**
 * Loading mask service
 * Contains functions for displaying and hiding loading mask
 * 
 * @author Milan Vidojevic
 */
import { EventEmitter } from '@angular/core';

export class LoadingMaskService {

    /**
     * Loading mask toggle EventEmitter
     * 
     * @type {EventEmitter}
     */
    public loadingMaskToggle: EventEmitter<boolean> = new EventEmitter();

    /**
     * Fires loading mask toggle with false to trigger loading mask hide
     */
    public hideLoadingMask(): void {
        this.loadingMaskToggle.emit(false);
    }

    /**
     * Fires loading mask toggle with true to trigger loading mask show
     */
    public showLoadingMask(): void {
        this.loadingMaskToggle.emit(true);
    }
}