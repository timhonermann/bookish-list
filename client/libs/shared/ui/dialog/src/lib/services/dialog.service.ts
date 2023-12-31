import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogConfig } from '../models/dialog.models';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  open<T, R = unknown, D = unknown>(
    component: ComponentType<T>,
    config: DialogConfig<D>,
  ): MatDialogRef<T, R> {
    return this.dialog.open(component, config);
  }
}
