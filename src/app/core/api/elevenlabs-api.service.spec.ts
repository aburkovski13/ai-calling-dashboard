import { TestBed } from '@angular/core/testing';
import { ElevenLabsApiService } from './eleven-labs-api.service';

describe('ElevenLabsApiService', () => {
    let service: ElevenLabsApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ElevenLabsApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
