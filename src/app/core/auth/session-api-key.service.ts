import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'elevenlabs_demo_api_key';

@Injectable({
    providedIn: 'root',
})
export class SessionApiKeyService {
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    private readonly apiKeySignal = signal<string>(this.loadKey());

    readonly apiKey = this.apiKeySignal.asReadonly();

    private loadKey(): string {
        if (!this.isBrowser) {
            return '';
        }

        return sessionStorage.getItem(STORAGE_KEY) ?? '';
    }

    setApiKey(key: string): void {
        const trimmed = key.trim();
        this.apiKeySignal.set(trimmed);

        if (this.isBrowser) {
            sessionStorage.setItem(STORAGE_KEY, trimmed);
        }
    }

    clearApiKey(): void {
        this.apiKeySignal.set('');

        if (this.isBrowser) {
            sessionStorage.removeItem(STORAGE_KEY);
        }
    }

    getApiKey(): string {
        return this.apiKeySignal();
    }

    hasKey(): boolean {
        return !!this.apiKeySignal();
    }
}
