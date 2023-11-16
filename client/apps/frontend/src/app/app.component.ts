import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthActions } from '@bookish-list/frontend/shared/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'bookish-list-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkAuth());
  }
}
