import { Component, Inject, HostBinding } from '@angular/core';
import { ToastService } from '../toast.service';
import { Observable } from 'rxjs';
import { TOAST_CONFIG } from '../toast-config.injection-token';
import { ToastConfig } from '../toast-config.interface';
import { ToastOptions } from '../toast-options.interface';

@Component({
  selector: 'dk-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent {
  public toastOptions$: Observable<ToastOptions[]> = this.toastService.getToasts();

  constructor(
    public toastService: ToastService,
    @Inject(TOAST_CONFIG) private config: ToastConfig,
  ) { }

  @HostBinding('class') position = this.config.position || 'bottom-right';

  public handleRemove(toastOptions: ToastOptions): void {
    this.toastService.removeToast(toastOptions);
  }
}
