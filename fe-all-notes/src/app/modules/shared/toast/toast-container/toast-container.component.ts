import { Component, Inject, HostBinding } from '@angular/core';
import { ToastData } from '../toast-data.interface';
import { ToastService } from '../toast.service';
import { Observable } from 'rxjs';
import { TOAST_CONFIG } from '../toast-config.injection-token';
import { ToastConfig } from '../toast-config.interface';

@Component({
  selector: 'dk-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent {
  public toastDatas$: Observable<ToastData[]> = this.toastService.getToasts();

  constructor(
    public toastService: ToastService,
    @Inject(TOAST_CONFIG) private config: ToastConfig,
  ) { }

  @HostBinding('class') position = this.config.position || 'bottom-right';

  public handleRemove(toastData: ToastData): void {
    this.toastService.removeToast(toastData);
  }
}
