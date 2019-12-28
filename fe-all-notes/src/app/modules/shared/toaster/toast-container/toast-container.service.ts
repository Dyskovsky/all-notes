import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastContainerComponent } from './toast-container.component';

@Injectable({
  providedIn: 'root',
})
export class ToastContainerService {
  private overlayRef = this.overlay.create();
  private portal = new ComponentPortal(ToastContainerComponent);

  constructor(
    private overlay: Overlay,
  ) {}

  // TODO maybe it should be invoked in store?
  init() {
    if (!this.portal.isAttached) {
      this.portal.attach(this.overlayRef);
    }
  }
}
