import { Component, Inject, HostBinding, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TOAST_CONFIG } from '../data/toast-config.injection-token';
import { ToastConfig } from '../models/toast-config.interface';
import { Toast } from '../models/toast.interface';
import { ToastComponent } from '../toast/toast.component';
import { Select } from '@ngxs/store';
import { ToastsState } from '../toasts.state';
import { defaultToastConfig } from '../data/default-toast-config';

@Component({
  selector: 'dk-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent implements AfterViewInit, OnDestroy {
  @Select(ToastsState.toasts) public toasts$: Observable<Toast[]>;

  @ViewChildren(ToastComponent) public toastComponents: QueryList<ToastComponent>;

  @HostBinding('class') position = this.config.position;

  private toastComponentsChangesSub = new Subscription();

  constructor(@Inject(TOAST_CONFIG) private config: ToastConfig) {
    this.config = { ...defaultToastConfig, ...this.config };
  }

  ngAfterViewInit(): void {
    this.toastComponentsChangesSub.add(
      this.toastComponents.changes.subscribe(this.arrangeToasts));
  }

  ngOnDestroy() {
    this.toastComponentsChangesSub.unsubscribe();
  }

  trackById(_, toast: Toast): number {
    return toast.id;
  }

  private arrangeToasts(toastComponents: QueryList<ToastComponent>): void {
    let containerHeight = 0;
    toastComponents.forEach(toastComponent => {
      setTimeout((value) => toastComponent.setPosition(value), 0, containerHeight);
      containerHeight += toastComponent.getHeight();
    });
  }
}
