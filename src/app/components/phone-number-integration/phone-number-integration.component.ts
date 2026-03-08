import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { MATERIAL_IMPORTS } from '../../shared/materials/material-imports';
import { EventEmitter, Output } from '@angular/core';
import { ElevenLabsApiService } from '../../core/api/eleven-labs-api.service';
import { CallSetupStateService } from '../../core/state/call-setup-state.service.ts.service';

@Component({
    selector: 'app-phone-integration',
    standalone: true,
    imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS],
    templateUrl: './phone-number-integration.component.html',
    styleUrls: ['./phone-number-integration.component.scss'],
})
export class PhoneNumberIntegrationComponent {
    private readonly fb = inject(FormBuilder);
    private readonly elevenlabsApiService = inject(ElevenLabsApiService);
    private readonly callSetupStateService = inject(CallSetupStateService);

    @Output() completed = new EventEmitter<void>();

    hidePassword = true;
    isSubmitting = false;
    submitError = '';

    readonly form = this.fb.group({
        phoneNumber: ['', [Validators.required]],
        displayName: ['', [Validators.required, Validators.minLength(2)]],
        sipTrunkAddress: ['', [Validators.required]],
        sipUsername: ['', [Validators.required]],
        sipPassword: ['', [Validators.required]],
    });

    resetForm(): void {
        this.form.reset();
        this.submitError = '';
    }

    submitTelephony(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        this.submitError = '';

        this.elevenlabsApiService
            .createPhoneNumber({
                label: this.form.controls.displayName.value ?? '',
                phoneNumber: this.form.controls.phoneNumber.value ?? '',
                address: this.form.controls.sipTrunkAddress.value ?? '',
                username: this.form.controls.sipUsername.value ?? '',
                password: this.form.controls.sipPassword.value ?? '',
            })
            .subscribe({
                next: (response: any) => {
                    this.isSubmitting = false;

                    // TODO: add correct structure after test api call
                    const phoneNumberId =
                        response?.phone_number_id || response?.phoneNumberId || response?.id;
                    if (phoneNumberId) {
                        this.callSetupStateService.setAgentPhoneNumberId(phoneNumberId);
                    }

                    this.completed.emit();
                },
                error: (error) => {
                    this.isSubmitting = false;
                    console.error('createPhoneNumber error:', error);

                    this.submitError =
                        error?.error?.detail?.message ||
                        'Failed to create phone number integration.';
                },
            });
    }
}
