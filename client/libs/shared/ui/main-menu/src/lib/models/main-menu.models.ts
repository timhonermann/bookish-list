import { IconType } from '@bookish-list/shared/ui/icons';

export type MenuItem = {
  icon: IconType;
  label: string;
  routerLink?: string;
  action?: () => void;
};
