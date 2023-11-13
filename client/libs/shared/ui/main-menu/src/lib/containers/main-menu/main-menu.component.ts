import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainMenuItemComponent } from '../../presentationals/main-menu-item/main-menu-item.component';
import { MenuItem } from '../../models/main-menu.models';

@Component({
  selector: 'bookish-list-main-menu',
  standalone: true,
  imports: [CommonModule, MainMenuItemComponent, RouterLink, RouterLinkActive],
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  @Input({ required: true }) menuItems: MenuItem[] = [];

  @Input() utilityMenuItems: MenuItem[] = [];
}
