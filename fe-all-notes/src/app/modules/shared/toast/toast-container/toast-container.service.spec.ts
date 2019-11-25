import { TestBed } from '@angular/core/testing';

import { ToastContainerService } from './toast-container.service';

describe('ToastContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastContainerService = TestBed.get(ToastContainerService);
    expect(service).toBeTruthy();
  });
});
