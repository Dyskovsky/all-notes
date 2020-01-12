import { Injectable, Injector } from '@angular/core';
import { ComponentType, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MODAL_DATA } from './data/modal-data.injection-token';
import { ModalRef } from './models/modal-ref';

// TODO components should be rendered by root service!

@Injectable()
export class ModalService {
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay, private injector: Injector) {
    // this.overlayRef.
  }

  open<T>(component: ComponentType<T>, modalData: any): ModalRef<T, any> {
    this.overlayRef = this.createOverlay();
    const modalRef = new ModalRef<T, any>(this.overlayRef);
    const injectorTokens = new WeakMap<any, any>([
      [MODAL_DATA, modalData],
      [ModalRef, modalRef],
    ]);
    injectorTokens.set(MODAL_DATA, modalData);
    const portalInjector = new PortalInjector(this.injector, injectorTokens);

    const portal = new ComponentPortal(component, null, portalInjector);
    portal.attach(this.overlayRef);
    // modalRef.componentInstance =
    return modalRef;
  }

  private createOverlay(): OverlayRef {
    return this.overlay.create();
  }
}
