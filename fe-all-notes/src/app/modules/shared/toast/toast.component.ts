import { Component, Input, OnInit, ElementRef, Inject, Renderer2 } from '@angular/core';
import { ToastOptions } from './toast-options.interface';
import { TOAST_CONFIG } from './toast-config.injection-token';
import { ToastConfig } from './toast-config.interface';
import { ToastStoreService } from './toast-store.service';

@Component({
  selector: 'dk-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() public toastOptions: ToastOptions;

  private top: number;
  private finalTop: number;
  private animationMovingTime: number;

  constructor(private element: ElementRef, @Inject(TOAST_CONFIG) private config: ToastConfig, private renderer: Renderer2, private toastStore: ToastStoreService) {
  }

  ngOnInit() {
    const horizontalContainerPosition = this.config.position.includes('left') ? 'left' : 'right';
    const isTopContainerPosition = this.config.position.includes('top');

    this.renderer.setStyle(this.element.nativeElement, horizontalContainerPosition, '0');
    this.finalTop = isTopContainerPosition ? -this.getHeight() : this.config.spacingBeetwenPx;
    this.updateTop(isTopContainerPosition ? window.innerHeight : -(window.innerHeight + this.config.predictedToastHeightPx));
    this.removeAfterTimeout(this.config.timeout);
  }

  private updateTop(value: number) {
    if (value !== this.top) {
      this.animationMovingTime =  Math.abs(value - this.top) * this.config.animationTimeCoefficient;
      this.top = value;
      this.renderer.setStyle(this.element.nativeElement, 'transition', `opacity ${this.config.animationOpacityTimeMs}ms, top ${this.animationMovingTime}ms ease-out`);
      this.renderer.setStyle(this.element.nativeElement, 'top', `${this.top}px`);
    }
  }

  private removeAfterTimeout(timeout: number): void {
    if (timeout) {
      setTimeout(() => {
        this.updateTop(this.finalTop);
        setTimeout(() => this.removeFromStore(), this.animationMovingTime);
      }, timeout);
    }
  }

  getHeight(): number {
    return this.element.nativeElement ? this.element.nativeElement.clientHeight + this.config.spacingBeetwenPx : 0;
  }

  handleRemove() {
    this.renderer.setStyle(this.element.nativeElement, 'opacity', '0');
    setTimeout(() => this.removeFromStore(), this.config.animationOpacityTimeMs);
  }

  setPosition(currentContainerHeight: number) {
    if (this.top !== this.finalTop) {
      const containerPosition = this.config.position;
      this.updateTop(containerPosition.includes('bottom') ? - currentContainerHeight - this.getHeight() : currentContainerHeight);
    }
  }

  private removeFromStore(): void {
    const toasts = this.toastStore.snapshot.filter(toastOptions => toastOptions !== this.toastOptions);
    this.toastStore.update(toasts);
  }
}
