import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyConfigComponent } from './api-key-config.component';

describe('ApiKeyConfigComponent', () => {
  let component: ApiKeyConfigComponent;
  let fixture: ComponentFixture<ApiKeyConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiKeyConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiKeyConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
