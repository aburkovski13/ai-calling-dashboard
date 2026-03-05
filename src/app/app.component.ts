import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { HotelProfileComponent } from '../components/hotel-profile/hotel-profile.component';
import { AiCallConfigComponent } from '../components/ai-call-config/ai-call-config.component';
import { PhoneNumberIntegrationComponent } from '../components/phone-number-integration/phone-number-integration.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        HotelProfileComponent,
        PhoneNumberIntegrationComponent,
        AiCallConfigComponent,
        MatIconModule,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('reveal', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('260ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ]),
    ],
})
export class AppComponent {
    step = 1;

    onHotelCompleted(): void {
        this.step = 2;
    }

    onPhoneNumberIntegrationCompleted(): void {
        this.step = 3;
    }

    onAiCompleted(): void {
        this.step = 4;
    }

    editStep(target: number): void {
        this.step = target;
    }

    isDone(n: number): boolean {
        return this.step > n;
    }

    isActive(n: number): boolean {
        return this.step === n;
    }
}
