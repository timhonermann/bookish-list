import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '@bookish-list/shared/ui/button';

@Component({
  selector: 'bookish-list-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ButtonComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  readonly searchControl = new FormControl<string>('');

  options = ['first', 'second', 'third'];

  search(): void {
    console.log('Searching for', this.searchControl.value);
  }
}
