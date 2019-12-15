import { Component, Inject, HostBinding, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TOAST_CONFIG } from '../toast-config.injection-token';
import { ToastConfig } from '../toast-config.interface';
import { ToastOptions } from '../toast-options.interface';
import { ToastComponent } from '../toast.component';
import { ToastStoreService } from '../toast-store.service';

@Component({
  selector: 'dk-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent implements AfterViewInit, OnDestroy {
  public toastOptions$: Observable<ToastOptions[]> = this.toastStore.get$();

  @ViewChildren(ToastComponent) public toastComponents: QueryList<ToastComponent>;

  @HostBinding('class') position = this.config.position;

  private toastComponentsChangesSub = new Subscription();

  constructor(
    public toastStore: ToastStoreService,
    @Inject(TOAST_CONFIG) private config: ToastConfig,
  ) { }

  ngAfterViewInit(): void {
    this.toastComponentsChangesSub.add(this.toastComponents.changes.subscribe((toastComponents: QueryList<ToastComponent>) => {
      let containerHeight = 0;
      toastComponents.forEach(toastComponent => {
        setTimeout((value) => toastComponent.setPosition(value), 0, containerHeight);
        containerHeight += toastComponent.getHeight();
      });
    }));
  }

  ngOnDestroy() {
    this.toastComponentsChangesSub.unsubscribe();
  }
}
