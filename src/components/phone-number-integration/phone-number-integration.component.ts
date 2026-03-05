import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { MATERIAL_IMPORTS } from '../../shared/materials/material-imports';
import { EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-telephony-integration',
    standalone: true,
    imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS],
    templateUrl: './phone-number-integration.component.html',
    styleUrls: ['./phone-number-integration.component.scss'],
})
export class PhoneNumberIntegrationComponent {
    private readonly fb = inject(FormBuilder);

    @Output() completed = new EventEmitter<void>();

    readonly form = this.fb.group({
        phoneNumber: ['', [Validators.required]],
        displayName: ['', [Validators.required, Validators.minLength(2)]],
        sipTrunkAddress: ['', [Validators.required]],
    });

    submitPhoneNumber(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        // TODO: send request (Twilio/SIP integration)
        console.log('Telephony integration submit:', this.form.value);
        this.completed.emit();
    }
}
