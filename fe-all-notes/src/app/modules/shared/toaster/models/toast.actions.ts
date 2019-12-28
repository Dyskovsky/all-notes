import { ToastDataOptions } from './toast-data-options.interface';
import { ToastViewOptions } from './toast-view-options.interface';

export class AddToast {
  static readonly type = '[Toast] Add';
  constructor(
    public dataOptions: ToastDataOptions,
    public viewOptions: ToastViewOptions) {}
}

export class RemoveToast {
  static readonly type = '[Toast] Remove';
  constructor(public id: number) {}
}
