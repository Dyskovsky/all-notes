import { TestBed } from '@angular/core/testing';

import { ToastStoreService } from './toast-store.service';

describe('ToastStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastStoreService = TestBed.get(ToastStoreService);
    expect(service).toBeTruthy();
  });
});
