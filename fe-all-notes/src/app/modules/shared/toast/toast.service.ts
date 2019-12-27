import { Injectable } from '@angular/core';
import { ToastDataOptions } from './toast-data-options.interface';
import { Store } from '@ngxs/store';
import { AddToast } from './toast.actions';
import { ToastViewOptions } from './toast-view-options.interface';

// TODO add warning when ToastModule isnt't injected in root module
// https://blog.angularindepth.com/creating-a-toast-service-with-angular-cdk-a0d35fd8cc12
@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private store: Store) {}

  public success(toastDataOptions: ToastDataOptions): void {
    const toastViewOptions = {
      colorClass: 'success',
      iconClass: 'mdi mdi-check-circle',
    };
    this.generic(toastDataOptions, toastViewOptions);
  }

  public info(toastDataOptions: ToastDataOptions): void {
    const toastViewOptions = {
      colorClass: 'info',
      iconClass: 'mdi mdi-information',
    };
    this.generic(toastDataOptions, toastViewOptions);
  }

  public warning(toastDataOptions: ToastDataOptions): void {
    const toastViewOptions = {
      colorClass: 'warning',
      iconClass: 'mdi mdi-alert',
    };
    this.generic(toastDataOptions, toastViewOptions);
  }

  public error(toastDataOptions: ToastDataOptions): void {
    const toastViewOptions = {
      colorClass: 'danger',
      iconClass: 'mdi mdi-alert-circle',
    };
    this.generic(toastDataOptions, toastViewOptions);
  }

  public generic(toastDataOptions: ToastDataOptions, toastViewOptions: ToastViewOptions): void {
    this.store.dispatch(new AddToast(toastDataOptions, toastViewOptions));
  }
}
