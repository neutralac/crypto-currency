import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { isNumber } from 'util';

@Component({
    selector: 'app-pagination-bar',
    templateUrl: './pagination-bar.component.html',
    styleUrls: ['./pagination-bar.component.scss']
})
export class PaginationBar implements OnInit {

    private activePageIndex: number;

    public isFirst: boolean = false;

    public isLast: boolean = false;

    public pageCount: number = 0;

    public pages: number[] = [];

    @Output() public pageChanged: EventEmitter<any[]> = new EventEmitter();

    @Input() config: { allItems: any[], pageSize: number, defaultPageIndex?: number } = {
        allItems: [],
        pageSize: 0
    };

    public ngOnInit(): void {
        this.pageCount = this.calculatePageCount();
        this.setPages();
        this.setInitialPage();
    }

    private calculatePageCount(): number {
        let pageSize = this.config.pageSize;
        let itemsCount = this.config.allItems ? this.config.allItems.length : 0;
        let remainder = itemsCount % pageSize;
        let pageCount = (itemsCount - remainder) / pageSize;
        if (remainder) {
            pageCount++;
        }

        return pageCount;
    }

    private getActivePageItems(): any[] {
        let pageSize = this.config.pageSize;
        let startIndex = this.activePageIndex * pageSize;
        let endIndex = startIndex + pageSize;
        let itemsCount = this.config.allItems.length;
        if (endIndex > itemsCount) {
            endIndex = itemsCount;
        }
        let items = this.config.allItems.slice(startIndex, endIndex);

        return items;
    }

    private setInitialPage(): void {
        let pageIndex = isNumber(this.config.defaultPageIndex) ? this.config.defaultPageIndex : 0;
        this.setPage(pageIndex);
    }

    public setPage(index: number): void {
        if (0 <= index && index < this.pageCount) {
            this.activePageIndex = index;
            let items = this.getActivePageItems();
            this.pageChanged.emit(items);
            this.isLast = this.activePageIndex === (this.pageCount - 1);
            this.isFirst = this.activePageIndex === 0;
        }
    }

    private setPages() {
        let pages = [];
        let item = 0;
        while (item < this.pageCount) {
            item++;
            pages.push(item);
        }
        this.pages = pages;
    }
}