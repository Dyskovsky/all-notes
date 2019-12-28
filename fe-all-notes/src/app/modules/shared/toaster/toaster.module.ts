import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ToastConfig } from './models/toast-config.interface';
import { TOAST_CONFIG } from './data/toast-config.injection-token';
import { defaultToastConfig } from './data/default-toast-config';
import { NgxsModule } from '@ngxs/store';
import { ToastsState } from './toasts.state';

@NgModule({
  declarations: [ToastComponent, ToastContainerComponent],
  imports: [
    CommonModule,
    OverlayModule,
    NgxsModule.forFeature([ToastsState]),
  ],

  entryComponents: [
    ToastContainerComponent,
  ],
})
export class ToasterModule {
  static forRoot(config: ToastConfig): ModuleWithProviders {
    return {
      ngModule: ToasterModule,
      providers: [ {
        provide: TOAST_CONFIG,
        useValue: { ...defaultToastConfig, ...config},
      }],
    };
  }
}
