import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { MATERIAL_IMPORTS } from '../../shared/materials/material-imports';
import { EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-hotel-profile',
    standalone: true,
    imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS],
    templateUrl: './hotel-profile.component.html',
    styleUrls: ['./hotel-profile.component.scss'],
})
export class HotelProfileComponent {
    private readonly fb = inject(FormBuilder);

    @Output() completed = new EventEmitter<void>();

    readonly form = this.fb.group({
        hotelName: ['', [Validators.required, Validators.minLength(2)]],
        frontDeskPhone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        city: ['', [Validators.required]],
    });

    submitForm(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        // TODO later: API
        console.log('Form submitted:', this.form.value);
        this.completed.emit();
    }
}
