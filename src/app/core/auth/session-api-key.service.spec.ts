import { TestBed } from '@angular/core/testing';

import { SessionApiKeyService } from './session-api-key.service';

describe('SessionApiKeyService', () => {
    let service: SessionApiKeyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SessionApiKeyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
