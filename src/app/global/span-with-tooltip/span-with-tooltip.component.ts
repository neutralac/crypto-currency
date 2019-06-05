import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-span-with-tooltip',
    templateUrl: './span-with-tooltip.component.html'
})
export class SpanWithTooltip implements OnInit {

    @Input() placement: string = 'right';

    @Input() text: string = '';

    @Input() tooltipText: string;

    public ngOnInit(): void {
        if (!this.tooltipText) {
            this.tooltipText = this.text;
        }
    }
}