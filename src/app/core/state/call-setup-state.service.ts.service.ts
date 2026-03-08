import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CallSetupStateService {
    private readonly agentIdSignal = signal<string>('agent_5101kk1hpjatfprsea0krkxj11vr');
    private readonly agentPhoneNumberIdSignal = signal<string>('');
    private readonly assistantNameSignal = signal<string>('');

    readonly agentId = this.agentIdSignal.asReadonly();
    readonly agentPhoneNumberId = this.agentPhoneNumberIdSignal.asReadonly();
    readonly assistantName = this.assistantNameSignal.asReadonly();

    setAgentId(agentId: string): void {
        this.agentIdSignal.set(agentId.trim());
    }

    setAgentPhoneNumberId(phoneNumberId: string): void {
        this.agentPhoneNumberIdSignal.set(phoneNumberId.trim());
    }

    setAssistantName(name: string): void {
        this.assistantNameSignal.set(name.trim());
    }

    getAgentId(): string {
        return this.agentIdSignal();
    }

    getAgentPhoneNumberId(): string {
        return this.agentPhoneNumberIdSignal();
    }

    getAssistantName(): string {
        return this.assistantNameSignal();
    }
}
