import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { MATERIAL_IMPORTS } from '../../shared/materials/material-imports';
import { EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-ai-call-config',
    standalone: true,
    imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS],
    templateUrl: './ai-call-config.component.html',
    styleUrls: ['./ai-call-config.component.scss'],
})
export class AiCallConfigComponent {
    private readonly fb = inject(FormBuilder);

    @Output() completed = new EventEmitter<void>();

    readonly assistantForm = this.fb.group({
        assistantName: ['', [Validators.required]],
        assistantMessage: ['', [Validators.required]],
    });

    readonly demoForm = this.fb.group({
        targetPhoneNumber: ['', [Validators.required]],
        phoneOwnerName: ['', [Validators.required]],
    });

    resetAssistant(): void {
        this.assistantForm.reset();
    }

    resetDemo(): void {
        this.demoForm.reset();
    }

    startAiCall(): void {
        if (this.assistantForm.invalid || this.demoForm.invalid) {
            this.assistantForm.markAllAsTouched();
            this.demoForm.markAllAsTouched();
            return;
        }

        // TODO: future API call
        const payload = {
            ...this.assistantForm.value,
            ...this.demoForm.value,
        };

        console.log('Start AI Call payload:', payload);
        this.completed.emit();
    }
}
