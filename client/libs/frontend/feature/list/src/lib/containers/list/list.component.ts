import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchBarComponent } from '../../presentationals/search-bar.component';

@Component({
  selector: 'bookish-list-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {}
