import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-pagination',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  protected MAX_PAGE: number = 20;

  @Output() pageChanged = new EventEmitter<number>();
  @Input() public currentPage = signal(1);

  nextPage() {
    if (this.currentPage() <= this.MAX_PAGE) {
      this.currentPage.update(value => value + 1);

      this.pageChanged.emit(this.currentPage());
    }
  }

  lastPage() {
    this.currentPage.set(this.MAX_PAGE);

    this.pageChanged.emit(this.currentPage());
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(value => value - 1);

      this.pageChanged.emit(this.currentPage());
    }
  }

  firstPage() {
    this.currentPage.set(1);

    this.pageChanged.emit(this.currentPage());
  }

}
