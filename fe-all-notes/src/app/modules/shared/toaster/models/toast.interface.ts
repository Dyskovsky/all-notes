import { ToastDataOptions } from './toast-data-options.interface';
import { ToastViewOptions } from './toast-view-options.interface';

export interface Toast {
  readonly id: number;
  readonly dataOptions: ToastDataOptions;
  readonly viewOptions: ToastViewOptions;
}
