import { Injectable, Inject } from '@angular/core';
import { ToastData } from './toast-data.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { TOAST_CONFIG } from './toast-config.injection-token';
import { ToastConfig } from './toast-config.interface';
import { defaultToastConfig } from './default-toast-config-object';

// TODO add warning when ToastModule isnt't injected in root module
// https://blog.angularindepth.com/creating-a-toast-service-with-angular-cdk-a0d35fd8cc12
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts$ = new BehaviorSubject<ToastData[]>([]);

  constructor(@Inject(TOAST_CONFIG) private config: ToastConfig ) {}

  // TODO shoulnt be public
  public getToasts(): Observable<ToastData[]> {
    return this.toasts$.asObservable();
  }

  // TODO shoulnt be public
  public removeToast(toastDataToRemove: ToastData): void {
    const toasts = this.toasts$.getValue().filter(toastData => toastData !== toastDataToRemove);
    this.toasts$.next(toasts);
  }

  public success(toastData: ToastData): void {
    this.toasts$.next([...this.toasts$.getValue(), toastData]);
    const timeout = this.config.timeout !== undefined ? this.config.timeout : defaultToastConfig.timeout;
    if (timeout) {
      setTimeout(() => {
        this.removeToast(toastData);
      }, timeout);
    }
  }

  public info(toastData: ToastData): void {

  }

  public warning(toastData: ToastData): void {

  }

  public error(toastData: ToastData): void {

  }


}
