import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastContainerComponent } from './toast-container/toast-container.component';

@Injectable({
  providedIn: 'root',
})
export class ToastContainerInitializerService {
  private overlayRef = this.overlay.create();
  private portal = new ComponentPortal(ToastContainerComponent);

  constructor(
    private overlay: Overlay,
  ) {}

  init() {
    if (!this.portal.isAttached) {
      this.portal.attach(this.overlayRef);
    }
  }
}
