import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogLayoutComponent } from '@bookish-list/shared/ui/dialog';

@Component({
  selector: 'bookish-list-add-book-dialog',
  standalone: true,
  imports: [CommonModule, DialogLayoutComponent],
  templateUrl: './add-book-dialog.component.html',
  styleUrl: './add-book-dialog.component.scss',
})
export class AddBookDialogComponent {}
