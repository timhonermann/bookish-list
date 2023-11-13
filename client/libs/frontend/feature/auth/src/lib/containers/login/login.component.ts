import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthActions } from '@bookish-list/frontend/shared/auth';
import { ButtonComponent } from '@bookish-list/shared/ui/button';
import { Store } from '@ngrx/store';

@Component({
  selector: 'bookish-list-login',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly store = inject(Store);

  login(): void {
    this.store.dispatch(AuthActions.login());
  }
}
