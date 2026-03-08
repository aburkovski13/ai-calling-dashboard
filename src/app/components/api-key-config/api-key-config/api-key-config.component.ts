import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { MATERIAL_IMPORTS } from '../../../shared/materials/material-imports';
import { SessionApiKeyService } from '../../../core/auth/session-api-key.service';

@Component({
    selector: 'app-api-key-config',
    standalone: true,
    imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS],
    templateUrl: './api-key-config.component.html',
    styleUrls: ['./api-key-config.component.scss'],
})
export class ApiKeyConfigComponent {
    private readonly fb = inject(FormBuilder);
    private readonly apiKeyService = inject(SessionApiKeyService);

    hideKey = true;

    readonly form = this.fb.group({
        apiKey: [this.apiKeyService.getApiKey(), [Validators.required]],
    });

    saveKey(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.apiKeyService.setApiKey(this.form.controls.apiKey.value ?? '');
    }

    clearKey(): void {
        this.apiKeyService.clearApiKey();
        this.form.reset({ apiKey: '' });
    }

    hasSavedKey(): boolean {
        return this.apiKeyService.hasKey();
    }
}
