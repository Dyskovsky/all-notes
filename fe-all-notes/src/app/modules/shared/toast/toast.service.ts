import { Injectable, Injector } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ToastComponent } from './toast.component';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TOAST_DATA } from './toast-data.injection-token';

// TODO add warning when ToastModule isnt't injected in root module
// https://blog.angularindepth.com/creating-a-toast-service-with-angular-cdk-a0d35fd8cc12
@Injectable({
  providedIn: 'root',
})
export class ToastService {
    private overlayRef: OverlayRef = this.overlay.create();
    private portal: ComponentPortal<any>;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) { }


  public success(title: string, body: string): void {
    const injectorTokens = new WeakMap();
    injectorTokens.set(TOAST_DATA, { title, body });
    const injector: Injector =  new PortalInjector(this.injector, injectorTokens);

    this.portal = new ComponentPortal(ToastComponent, null, injector);
    this.portal.attach(this.overlayRef);
  }

  public info(title: string, body: string): void {

  }

  public warning(title: string, body: string): void {

  }

  public error(title: string, body: string): void {

  }


}
