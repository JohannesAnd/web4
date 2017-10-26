import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  itemsPerPage: number;
  currentPage: number;
  itemsPerPageOptions: number[];

  @Input() totalItemsCount: number;
  @Output() paginationChange = new EventEmitter();

  constructor() {
    this.currentPage = 1;
    this.itemsPerPageOptions = [25, 50, 100, 250, 500, 1000];
    this.itemsPerPage = this.itemsPerPageOptions[0];
  }

  pages() {
    const totalPages = Math.ceil((this.totalItemsCount+1) / this.itemsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  emitChange() {
    this.paginationChange.emit({
      page: this.currentPage,
      itemsPerPage: this.itemsPerPage
    })
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.emitChange();
  }

  changeItemsPerPage(itemsPerPage: number) {
    const startItemPrevious = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = Math.ceil(startItemPrevious / itemsPerPage);
    this.emitChange();
  }

}
