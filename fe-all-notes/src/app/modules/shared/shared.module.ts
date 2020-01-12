import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterModule } from './toaster/toaster.module';
import { LoadingComponent } from './loading/loading.component';
import { ModalModule } from './modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule.forRoot({ timeoutMs: 3000, position: 'bottom-right' }),
    ModalModule,
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent, ModalModule],
})
export class SharedModule { }
