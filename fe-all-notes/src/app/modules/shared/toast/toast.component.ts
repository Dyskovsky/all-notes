import { Component, Input } from '@angular/core';
import { ToastData } from './toast-data.interface';

@Component({
  selector: 'dk-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() public toastData: ToastData;
}
