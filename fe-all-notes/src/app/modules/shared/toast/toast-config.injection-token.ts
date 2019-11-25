import { InjectionToken } from '@angular/core';
import { ToastConfig } from './toast-config.interface';

export const TOAST_CONFIG = new InjectionToken<ToastConfig>('TOAST_CONFIG');
