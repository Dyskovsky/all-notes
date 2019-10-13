import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
    OverlayModule,
  ],
  entryComponents: [
    ToastComponent,
  ],
})
export class ToastModule { }
