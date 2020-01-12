import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ModalService } from './modal.service';
import { ModalContainerComponent } from './modal-container/modal-container.component';

@NgModule({
  declarations: [ModalContainerComponent],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  providers: [ ModalService],
  entryComponents: [ModalContainerComponent],
})
export class ModalModule { }
