import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthActions } from '@bookish-list/frontend/shared/auth';
import { FrontendRoutes } from '@bookish-list/frontend/shared/globals';
import { ButtonComponent } from '@bookish-list/shared/ui/button';
import { MainMenuComponent, MenuItem } from '@bookish-list/shared/ui/main-menu';
import { Store } from '@ngrx/store';
import { ShellLayoutComponent } from '../../components/shell-layout/shell-layout.component';

@Component({
  selector: 'bookish-list-shell',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ShellLayoutComponent,
    RouterOutlet,
    MainMenuComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  private readonly store = inject(Store);

  readonly menuItems: MenuItem[] = [
    {
      icon: 'book',
      label: 'My List',
      routerLink: FrontendRoutes.LIST,
    },
  ];

  readonly utilityMenuItems: MenuItem[] = [
    {
      icon: 'logout',
      label: 'Logout',
      action: () => this.store.dispatch(AuthActions.logout()),
    },
  ];
}
