import { Component } from '@angular/core';
import { ToastData } from '../toast-data.interface';
import { ToastService } from '../toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'dk-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent {

  public toastDatas$: Observable<ToastData[]> = this.toastService.getToasts();

  constructor(public toastService: ToastService) { }
}
