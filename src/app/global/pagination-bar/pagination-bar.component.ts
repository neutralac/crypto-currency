import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { isNumeric } from "rxjs/util/isNumeric";

@Component({
    selector: 'app-pagination-bar',
    templateUrl: './pagination-bar.component.html'
})
export class PaginationBar implements OnInit {

    private pageItems: any[] = [];

    private pageCount: number = 0;

    @Output() public pageChanged: EventEmitter<any[]> = new EventEmitter();

    @Input() config: { allItems: any[], pageSize: number, defaultPageIndex?: number } = {
        allItems: [],
        pageSize: 0
    };

    public ngOnInit(): void {
        this.pageCount = this.calculatePageCount();
        this.setInitialPage();
    }

    private calculatePageCount(): number {
        let pageSize = this.config.pageSize;
        let itemsCount = this.config.allItems ? this.config.allItems.length : 0;
        let pageCount = itemsCount / pageSize;
        let remainder = itemsCount % pageSize;
        if (remainder) {
            pageCount++;
        }

        return pageCount;
    }

    private setInitialPage() {
        let pageIndex = isNumber(this.config.defaultPageIndex) != undefined ?
    }

    public setPage(index: number) {

    }
}