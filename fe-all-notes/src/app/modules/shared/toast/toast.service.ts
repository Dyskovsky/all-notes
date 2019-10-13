import { Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastComponent } from './toast.component';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';

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
  ) { }


  public success(title: string, body: string): void {

    this.portal = new ComponentPortal(ToastComponent);
    this.portal.attach(this.overlayRef);
  }

  public info(title: string, body: string): void {

  }

  public warning(title: string, body: string): void {

  }

  public error(title: string, body: string): void {

  }


}
