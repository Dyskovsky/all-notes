import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterModule } from './toaster/toaster.module';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule.forRoot({ timeoutMs: 3000, position: 'bottom-right' }),
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
})
export class SharedModule { }
