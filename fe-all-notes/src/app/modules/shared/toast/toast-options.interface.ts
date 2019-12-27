import { ToastDataOptions } from './toast-data-options.interface';
import { ToastViewOptions } from './toast-view-options.interface';

// TODO rename to something without 's' at the end
// TODO add id (?)
export interface ToastOptions {
  data: ToastDataOptions;
  view: ToastViewOptions;
}
