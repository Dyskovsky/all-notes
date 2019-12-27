import { Toast } from './toast.interface';

export class AddToast {
  static readonly type = '[Toast] Add';
  constructor(public toast: Toast) {}
}

export class RemoveToast {
  static readonly type = '[Toast] Remove';
  constructor(public toast: Toast) {}
}
