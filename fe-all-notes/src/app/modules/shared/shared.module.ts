import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from './toast/toast.module';

@NgModule({
  imports: [
    CommonModule,
    ToastModule.forRoot({ timeout: 3000 }),
  ],
  exports: [
    ToastModule,
  ]
})
export class SharedModule { }
