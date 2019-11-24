import { InjectionToken } from '@angular/core';
import { ToastData } from './toast-data.interface';

export const TOAST_DATA = new InjectionToken<ToastData>('TOAST_DATA');
