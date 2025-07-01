import {Component, computed, EventEmitter, Output, signal} from '@angular/core';
import {SearchType} from '../../../../core/models/search-type.enum';
import {CatSearch} from '../../../../core/models/cat.enum';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-book-input',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './book-input.component.html',
  styleUrl: './book-input.component.scss'
})
export class BookInputComponent {
  public title = 'library';

  public bookQuery = signal("");
  searchType = signal<SearchType>(SearchType.Title);

  isSearchDisabled = computed(() => this.bookQuery().trim() === '');

  @Output()
  public valueSubmit = new EventEmitter<{ query: string, type: SearchType }>();

  public onSubmit(event: Event): void {
    event.preventDefault();

    if (this.isClicked) {
      this.bookQuery.set(this.getRandomCatSearch());
    }
    this.valueSubmit.emit({query: this.bookQuery(), type: this.searchType()});
    this.bookQuery.set('');
  }

  isClicked: boolean = false;

  public toggleCatButton() {
    this.isClicked = !this.isClicked;
  }

  private getRandomCatSearch(): CatSearch {
    const values = Object.values(CatSearch);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
  }
}
