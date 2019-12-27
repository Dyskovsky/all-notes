import { ToastDataOptions } from './toast-data-options.interface';
import { ToastViewOptions } from './toast-view-options.interface';

// TODO add id (?)
export interface Toast {
  data: ToastDataOptions;
  view: ToastViewOptions;
}
