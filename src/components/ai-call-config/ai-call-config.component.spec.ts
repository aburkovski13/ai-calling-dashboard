import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCallConfigComponent } from './ai-call-config.component';

describe('AiCallConfigComponent', () => {
  let component: AiCallConfigComponent;
  let fixture: ComponentFixture<AiCallConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCallConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiCallConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
