import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../../interfaces/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() start: number = 1

  @Input() paginationConfig: Pagination | null = null

  @Output() load = new EventEmitter<number>();

  constructor() { }

  pageUp() {
    if(this.paginationConfig?.hasNext){
      this.start += 1;
      this.load.emit(this.start)
    }
  }

  pageDown() {
    if(this.paginationConfig?.hasPrevious && this.start > 1){
      this.start -= 1;
      this.load.emit(this.start)
    }
  }

  ngOnInit(): void {
  }

}
