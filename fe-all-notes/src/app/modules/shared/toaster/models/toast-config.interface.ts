export interface ToastConfig {
  animationOpacityTimeMs?: number;
  animationTimeCoefficient?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  predictedToastHeightPx?: number;
  spacingBeetwenPx?: number;
  timeoutMs?: number;
}
