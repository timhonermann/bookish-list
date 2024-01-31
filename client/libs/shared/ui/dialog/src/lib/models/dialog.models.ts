import { MatDialogConfig } from '@angular/material/dialog';

export type DialogWidth =
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge';

export interface DialogConfig<T = unknown> extends MatDialogConfig<T> {
  dialogWidth?: DialogWidth;
}
