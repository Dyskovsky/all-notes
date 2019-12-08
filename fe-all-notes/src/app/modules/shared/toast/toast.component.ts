import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastOptions } from './toast-options.interface';

@Component({
  selector: 'dk-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() public toastOptions: ToastOptions;

  @Output() public remove = new EventEmitter<ToastOptions>();
}
