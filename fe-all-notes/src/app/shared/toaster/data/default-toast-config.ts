import { ToastConfig } from '../models/toast-config.interface';

export const defaultToastConfig: Required<ToastConfig> = {
  animationOpacityTimeMs: 300,
  animationTimeCoefficient: 1,
  position: 'bottom-right',
  predictedToastHeightPx: 200,
  spacingBeetwenPx: 10,
  timeoutMs: 5000,
};
