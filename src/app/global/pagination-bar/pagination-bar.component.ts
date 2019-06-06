/**
 * Pagination bar component
 * 
 * @author Milan Vidojevic
 */
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { isNumber } from 'util';

@Component({
    selector: 'app-pagination-bar',
    templateUrl: './pagination-bar.component.html',
    styleUrls: ['./pagination-bar.component.scss']
})
export class PaginationBar implements OnInit {

    /**
     * Active page index
     * Used for toggling bar buttons active and disabled state
     * 
     * @type {number}
     */
    private activePageIndex: number;

    /**
     * Pagination bar config
     * 
     * @type {Object}
     */
    @Input() config: { allItems: any[], pageSize: number, defaultPageIndex?: number } = {
        allItems: [],
        pageSize: 0
    };

    /**
     * True if user navigated to the first page, false otherwise
     * 
     * @type {boolean}
     */
    public isFirst: boolean = false;

    /**
     * True if user navigated to the last page, false otherwise
     * 
     * @type {boolean}
     */
    public isLast: boolean = false;

    /**
     * Page changes EventEmitter
     * 
     * @type {EventEmitter}
     */
    @Output() public pageChanged: EventEmitter<any[]> = new EventEmitter();

    /**
     * Total page count
     * 
     * @type {number}
     */
    public pageCount: number = 0;

    /**
     * Array containing page indexes 
     * Used for display
     * 
     * @type {number[]}
     */
    public pages: number[] = [];

    /**
     * Angular lifecycle hook
     * Updates page count
     * Sets pages indexes for display and sets initial page
     */
    public ngOnInit(): void {
        this.pageCount = this.calculatePageCount();
        this.setPages();
        this.setInitialPage();
    }

    /**
     * Returns total page count based on number of items passed through config
     * 
     * @return {number}
     */
    private calculatePageCount(): number {
        let pageSize = this.config.pageSize;
        let itemsCount = this.getItemsCount();
        let remainder = itemsCount % pageSize;
        let pageCount = (itemsCount - remainder) / pageSize;
        if (remainder) {
            pageCount++;
        }

        return pageCount;
    }

    /**
     * Returns items to be used for active page display
     * 
     * @return {Object[]}
     */
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

    /**
     * Returns all items count or 0 if no item passed
     * 
     * @return {number}
     */
    private getItemsCount(): number {
        let itemsCount = this.config.allItems ? this.config.allItems.length : 0;

        return itemsCount;
    }

    /**
     * If it exists sets default page as initial, otherwise sets first page
     */
    private setInitialPage(): void {
        let pageIndex = isNumber(this.config.defaultPageIndex) ? this.config.defaultPageIndex : 0;
        this.setPage(pageIndex);
    }

    /**
     * Triggers page change and updates validation properties
     * 
     * @param {number} index 
     */
    public setPage(index: number): void {
        if (0 <= index && index < this.pageCount) {
            this.activePageIndex = index;
            let items = this.getActivePageItems();
            this.pageChanged.emit(items);
            this.updateIsLast();
            this.updateIsFirst();
        }
    }

    /**
     * Updates pages array with pages indexes for display
     */
    private setPages(): void {
        let pages = [];
        let item = 0;
        while (item < this.pageCount) {
            item++;
            pages.push(item);
        }
        this.pages = pages;
    }

    /**
     * Updates the value of isFirst property
     */
    private updateIsFirst(): void {
        this.isFirst = this.activePageIndex === 0;
    }

    /**
     * Updates the value of isLast property
     */
    private updateIsLast(): void {
        this.isLast = this.activePageIndex === (this.pageCount - 1);
    }
}