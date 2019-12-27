import { Injectable } from '@angular/core';
import { ToastDataOptions } from './toast-data-options.interface';
import { Toast } from './toast.interface';
import { Store } from '@ngxs/store';
import { AddToast } from './toast.actions';

// TODO add warning when ToastModule isnt't injected in root module
// https://blog.angularindepth.com/creating-a-toast-service-with-angular-cdk-a0d35fd8cc12
@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private store: Store) {}

  public success(toastDataOptions: ToastDataOptions): void {
    const toast = {
      data: toastDataOptions,
      view: {
        colorClass: 'success',
        iconClass: 'mdi mdi-check-circle',
      },
    };
    this.generic(toast);
  }

  public info(toastDataOptions: ToastDataOptions): void {
    const toast = {
      data: toastDataOptions,
      view: {
        colorClass: 'info',
        iconClass: 'mdi mdi-information',
      },
    };
    this.generic(toast);
  }

  public warning(toastDataOptions: ToastDataOptions): void {
    const toast = {
      data: toastDataOptions,
      view: {
        colorClass: 'warning',
        iconClass: 'mdi mdi-alert',
      },
    };
    this.generic(toast);
  }

  public error(toastDataOptions: ToastDataOptions): void {
    const toast = {
      data: toastDataOptions,
      view: {
        colorClass: 'danger',
        iconClass: 'mdi mdi-alert-circle',
      },
    };
    this.generic(toast);
  }

  public generic(toast: Toast): void {
    this.store.dispatch(new AddToast(toast));
  }
}
