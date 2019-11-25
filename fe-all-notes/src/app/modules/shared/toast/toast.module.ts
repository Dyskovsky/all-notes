import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import {OverlayModule } from '@angular/cdk/overlay';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ToastContainerService } from './toast-container/toast-container.service';

@NgModule({
  declarations: [ToastComponent, ToastContainerComponent],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    OverlayModule,
  ],
  entryComponents: [
    ToastContainerComponent,
  ],
})
export class ToastModule {
  constructor(
    private toastContainerService: ToastContainerService,
  ) {
    this.toastContainerService.init();
  }
}
