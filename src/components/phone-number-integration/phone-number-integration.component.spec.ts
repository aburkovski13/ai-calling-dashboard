import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberIntegrationComponent } from './phone-number-integration.component';

describe('PhoneNumberIntegrationComponent', () => {
  let component: PhoneNumberIntegrationComponent;
  let fixture: ComponentFixture<PhoneNumberIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneNumberIntegrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneNumberIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
