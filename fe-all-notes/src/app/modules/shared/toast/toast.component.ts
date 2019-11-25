import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastData } from './toast-data.interface';

@Component({
  selector: 'dk-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() public toastData: ToastData;

  @Output() public remove = new EventEmitter<ToastData>();
}
