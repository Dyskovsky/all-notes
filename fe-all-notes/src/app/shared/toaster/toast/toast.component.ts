import { Component, Input, OnInit, ElementRef, Inject, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { Toast } from '../models/toast.interface';
import { TOAST_CONFIG } from '../data/toast-config.injection-token';
import { ToastConfig } from '../models/toast-config.interface';
import { Store } from '@ngxs/store';
import { RemoveToast } from '../models/toast.actions';
import { defaultToastConfig } from '../data/default-toast-config';

@Component({
  selector: 'dk-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {
  @Input() public toast: Toast;

  private top: number;
  private finalTop: number;
  private animationMovingTime: number;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private store: Store,
    @Inject(TOAST_CONFIG) private config: ToastConfig) {
    this.config = { ...defaultToastConfig, ...this.config };
  }

  ngOnInit() {
    const horizontalContainerPosition = this.config.position.includes('left') ? 'left' : 'right';
    const isTopContainerPosition = this.config.position.includes('top');

    this.renderer.setStyle(this.element.nativeElement, horizontalContainerPosition, '0');
    this.finalTop = isTopContainerPosition ? -this.getHeight() : this.config.spacingBeetwenPx;
    this.updateTop(isTopContainerPosition ? window.innerHeight : -(window.innerHeight + this.config.predictedToastHeightPx));
    this.removeAfterTimeout(this.config.timeoutMs);
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
      const targetTop = containerPosition.includes('bottom') ? - currentContainerHeight - this.getHeight() : currentContainerHeight;
      this.updateTop(targetTop);
    }
  }

  private removeFromStore(): void {
    this.store.dispatch(new RemoveToast(this.toast.id));
  }
}
