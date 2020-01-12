import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';

@Component({
  selector: 'dk-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent extends BasePortalOutlet {

  @ViewChild(CdkPortalOutlet, {static: true}) portalOutlet: CdkPortalOutlet;

  constructor(
    private elementRef: ElementRef,
  ) {
    super();
  }

}
