export interface ToastConfig {
  // TODO: rename to timeoutMs
  animationOpacityTimeMs?: number;
  animationTimeCoefficient?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  predictedToastHeightPx?: number;
  spacingBeetwenPx?: number;
  timeout?: number;
}
