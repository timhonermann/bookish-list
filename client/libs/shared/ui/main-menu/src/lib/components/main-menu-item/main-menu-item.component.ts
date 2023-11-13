import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../models/main-menu.models';

@Component({
  selector: 'bookish-list-main-menu-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './main-menu-item.component.html',
  styleUrls: ['./main-menu-item.component.scss'],
})
export class MainMenuItemComponent {
  @Input({ required: true }) menuItem: MenuItem = {} as MenuItem;
}
