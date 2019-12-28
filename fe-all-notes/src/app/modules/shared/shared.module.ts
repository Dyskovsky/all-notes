import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterModule } from './toaster/toaster.module';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule.forRoot({ timeoutMs: 0, position: 'bottom-right' }),
  ],
})
export class SharedModule { }
