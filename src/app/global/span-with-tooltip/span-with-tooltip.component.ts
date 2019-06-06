/**
 * Span with tooltip component
 * 
 * @author Milan Vidojevic
 */
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-span-with-tooltip',
    templateUrl: './span-with-tooltip.component.html'
})
export class SpanWithTooltip implements OnInit {

    /**
     * String determing placement of tooltip element
     * Defaults to right
     * 
     * @type {string}
     */
    @Input() placement: string = 'right';

    /**
     * Text to be displayed in span
     * If no tooltipText than also used as tooltip text
     * 
     * @type {string}
     */
    @Input() text: string = '';

    /**
     * Text to display in tooltip
     * If not provided then text will be used
     * 
     * @type {string}
     */
    @Input() tooltipText: string;

    /**
     * Angular lifecycle hook
     * Updates tooltipText if not provided
     */
    public ngOnInit(): void {
        if (!this.tooltipText) {
            this.tooltipText = this.text;
        }
    }
}