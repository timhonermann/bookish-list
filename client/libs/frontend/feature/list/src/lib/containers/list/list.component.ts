import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchBarComponent } from '../../presentationals/search-bar.component';
import { ListActions } from '../../state/list.actions';
import { ListSelectors } from '../../state/list.selectors';

@Component({
  selector: 'bookish-list-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  private readonly store = inject(Store);

  searchResult = this.store.selectSignal(ListSelectors.searchResults);

  onSearchValueChanged(searchValue: string | null): void {
    this.store.dispatch(ListActions.lookupItems({ searchValue }));
  }
}
