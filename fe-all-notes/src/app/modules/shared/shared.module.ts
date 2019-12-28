import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterModule } from './toaster/toaster.module';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule.forRoot({ timeout: 3000, position: 'bottom-right' }),
  ],
  exports: [
    ToasterModule,
  ]
})
export class SharedModule { }
