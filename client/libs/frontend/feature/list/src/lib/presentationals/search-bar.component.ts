import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { LookupItem } from '../models/list.models';

const INPUT_DEBOUNCE_MS = 400;

@Component({
  selector: 'bookish-list-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  @Input() searchResult: LookupItem[] = [];

  @Output() searchValueChanged = new EventEmitter<string | null>();

  readonly searchControl = new FormControl<string>('');

  ngOnInit(): void {
    this.observeInputChanges();
  }

  private observeInputChanges(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(INPUT_DEBOUNCE_MS),
        distinctUntilChanged(),
      )
      .subscribe((searchValue) => {
        this.searchValueChanged.emit(searchValue);
      });
  }
}
