import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastOptions } from './toast-options.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastStoreService implements OnDestroy {
  private toasts$ = new BehaviorSubject<ToastOptions[]>([]);

  get$(): Observable<ToastOptions[]> {
    return this.toasts$.asObservable();
  }

  update(toastOptions: ToastOptions[]): void {
    this.toasts$.next(toastOptions);
  }

  get snapshot(): ToastOptions[] {
    return this.toasts$.getValue();
  }

  ngOnDestroy(): void {
    this.toasts$.complete();
  }
}
