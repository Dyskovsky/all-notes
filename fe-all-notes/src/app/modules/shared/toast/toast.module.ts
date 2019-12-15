import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ToastContainerService } from './toast-container/toast-container.service';
import { ToastConfig } from './toast-config.interface';
import { TOAST_CONFIG } from './toast-config.injection-token';
import { defaultToastConfig } from './default-toast-config-object';

@NgModule({
  declarations: [ToastComponent, ToastContainerComponent],
  imports: [
    CommonModule,
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

  static forRoot(config: ToastConfig): ModuleWithProviders {
    const filledConfig = Object.assign({}, defaultToastConfig, config);
    return {
      ngModule: ToastModule,
      providers: [ {
        provide: TOAST_CONFIG,
        useValue: filledConfig,
      }],
    };
  }
}
