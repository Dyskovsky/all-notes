import { ToastOptions } from './toast-options.interface';

export class AddToast {
  static readonly type = '[Toast] Add';
  constructor(public toastOptions: ToastOptions) {}
}

export class RemoveToast {
  static readonly type = '[Toast] Remove';
  constructor(public toastOptions: ToastOptions) {}
}
