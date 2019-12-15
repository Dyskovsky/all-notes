import { Injectable } from '@angular/core';
import { ToastDataOptions } from './toast-data-options.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastOptions } from './toast-options.interface';

// TODO add warning when ToastModule isnt't injected in root module
// https://blog.angularindepth.com/creating-a-toast-service-with-angular-cdk-a0d35fd8cc12
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts$ = new BehaviorSubject<ToastOptions[]>([]);

  // TODO shoulnt be public
  public getToasts(): Observable<ToastOptions[]> {
    return this.toasts$.asObservable();
  }

  // TODO shoulnt be public
  public removeToast(toastToRemove: ToastOptions): void {
    const toasts = this.toasts$.getValue().filter(toastData => toastData !== toastToRemove);
    this.toasts$.next(toasts);
  }

  public success(toastDataOptions: ToastDataOptions): void {
    const toastOptions = {
      data: toastDataOptions,
      view: {
        colorClass: 'success',
        iconClass: 'mdi mdi-check-circle',
      },
    };
    this.generic(toastOptions);
  }

  public info(toastDataOptions: ToastDataOptions): void {
    const toastOptions = {
      data: toastDataOptions,
      view: {
        colorClass: 'info',
        iconClass: 'mdi mdi-information',
      },
    };
    this.generic(toastOptions);
  }

  public warning(toastDataOptions: ToastDataOptions): void {
    const toastOptions = {
      data: toastDataOptions,
      view: {
        colorClass: 'warning',
        iconClass: 'mdi mdi-alert',
      },
    };
    this.generic(toastOptions);
  }

  public error(toastDataOptions: ToastDataOptions): void {
    const toastOptions = {
      data: toastDataOptions,
      view: {
        colorClass: 'danger',
        iconClass: 'mdi mdi-alert-circle',
      },
    };
    this.generic(toastOptions);
  }

  public generic(toastOptions: ToastOptions): void {
    this.toasts$.next([...this.toasts$.getValue(), toastOptions]);
  }
}
