import { Injectable } from '@angular/core';
import { ToastData } from './toast-data.interface';
import { BehaviorSubject, Observable } from 'rxjs';

// TODO add warning when ToastModule isnt't injected in root module
// https://blog.angularindepth.com/creating-a-toast-service-with-angular-cdk-a0d35fd8cc12
@Injectable({
  providedIn: 'root',
})
export class ToastService {
    private toasts$ = new BehaviorSubject<ToastData[]>([]);

  public getToasts(): Observable<ToastData[]> {
    return this.toasts$.asObservable();
  }

  public success(toastData: ToastData): void {
    this.toasts$.next([...this.toasts$.getValue(), toastData]);
  }

  public info(toastData: ToastData): void {

  }

  public warning(toastData: ToastData): void {

  }

  public error(toastData: ToastData): void {

  }


}
