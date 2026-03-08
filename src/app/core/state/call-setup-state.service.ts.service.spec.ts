import { TestBed } from '@angular/core/testing';

import { CallSetupStateServiceTsService } from './call-setup-state.service.ts.service';

describe('CallSetupStateServiceTsService', () => {
  let service: CallSetupStateServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallSetupStateServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
