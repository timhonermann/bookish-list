import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DialogService } from '@bookish-list/shared/ui/dialog';
import { Store } from '@ngrx/store';
import { LookupItem } from '../../models/list.models';
import { AddBookDialogComponent } from '../../presentationals/add-book-dialog/add-book-dialog.component';
import { SearchBarComponent } from '../../presentationals/search-bar/search-bar.component';
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

  private readonly dialogService = inject(DialogService);

  searchResult = this.store.selectSignal(ListSelectors.searchResults);

  onSearchValueChanged(searchValue: string | null): void {
    this.store.dispatch(ListActions.lookupItems({ searchValue }));
  }

  onOptionSelected(option: LookupItem): void {
    // TODO: Move to state
    this.dialogService.open(AddBookDialogComponent, { data: { option } });
  }
}
