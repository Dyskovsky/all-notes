import { TestBed } from '@angular/core/testing';

import { ClientConfigApiService } from './client-config-api.service';

describe('ClientConfigApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientConfigApiService = TestBed.get(ClientConfigApiService);
    expect(service).toBeTruthy();
  });
});
