import { Component, Inject } from '@angular/core';
import { TOAST_DATA } from './toast-data.injection-token';
import { ToastData } from './toast-data.interface';

@Component({
  selector: 'dk-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {

  constructor(@Inject(TOAST_DATA) public toastData: ToastData) { }

}
