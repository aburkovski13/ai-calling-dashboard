import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { MATERIAL_IMPORTS } from '../../shared/materials/material-imports';
import { EventEmitter, Output } from '@angular/core';
import { ElevenLabsApiService } from '../../core/api/eleven-labs-api.service';
import { CallSetupStateService } from '../../core/state/call-setup-state.service.ts.service';

@Component({
    selector: 'app-ai-call-config',
    standalone: true,
    imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS],
    templateUrl: './ai-call-config.component.html',
    styleUrls: ['./ai-call-config.component.scss'],
})
export class AiCallConfigComponent {
    private readonly fb = inject(FormBuilder);
    private readonly elevenlabsApiService = inject(ElevenLabsApiService);
    private readonly callSetupStateService = inject(CallSetupStateService);

    @Output() completed = new EventEmitter<void>();

    isCreatingAssistant = false;
    isStartingCall = false;

    assistantError = '';
    callError = '';

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
        this.assistantError = '';
    }

    resetDemo(): void {
        this.demoForm.reset();
    }

    createAssistant(): void {
        if (this.assistantForm.invalid) {
            this.assistantForm.markAllAsTouched();
            return;
        }

        this.isCreatingAssistant = true;
        this.assistantError = '';

        const agentId = this.callSetupStateService.getAgentId();

        this.elevenlabsApiService
            .updateAssistant({
                agentId,
                firstMessage: this.assistantForm.controls.assistantMessage.value ?? '',
            })
            .subscribe({
                next: () => {
                    this.isCreatingAssistant = false;

                    const assistantName = this.assistantForm.controls.assistantName.value ?? '';
                    this.callSetupStateService.setAssistantName(assistantName);
                },
                error: (error) => {
                    this.isCreatingAssistant = false;
                    console.error('updateAssistant error:', error);

                    this.assistantError =
                        error?.error?.detail?.message || 'Failed to configure assistant.';
                },
            });
    }

    startAiCall(): void {
        if (this.assistantForm.invalid || this.demoForm.invalid) {
            this.assistantForm.markAllAsTouched();
            this.demoForm.markAllAsTouched();
            return;
        }

        const agentId = this.callSetupStateService.getAgentId();
        const agentPhoneNumberId = this.callSetupStateService.getAgentPhoneNumberId();
        const assistantName =
            this.callSetupStateService.getAssistantName() ||
            this.assistantForm.controls.assistantName.value ||
            '';

        if (!agentPhoneNumberId) {
            this.callError = 'Phone number integration must be completed first.';
            return;
        }

        this.isStartingCall = true;
        this.callError = '';

        this.elevenlabsApiService
            .createBatchCall({
                callName: 'demo-call',
                agentId,
                agentPhoneNumberId,
                recipientPhoneNumber: this.demoForm.controls.targetPhoneNumber.value ?? '',
                recipientName: this.demoForm.controls.phoneOwnerName.value ?? '',
                assistantName,
            })
            .subscribe({
                next: () => {
                    this.isStartingCall = false;
                    this.completed.emit();
                },
                error: (error) => {
                    this.isStartingCall = false;
                    console.error('createBatchCall error:', error);

                    this.callError = error?.error?.detail?.message || 'Failed to start AI call.';
                },
            });
    }
}
