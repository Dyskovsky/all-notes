import { TestBed } from '@angular/core/testing';

import { ToastContainerInitializerService } from './toast-container-initializer.service';

describe('ToastContainerInitializerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastContainerInitializerService = TestBed.get(ToastContainerInitializerService);
    expect(service).toBeTruthy();
  });
});
