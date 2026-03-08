import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionApiKeyService } from '../auth/session-api-key.service';
import {
    CreateBatchCallPayload,
    CreatePhoneNumberPayload,
    UpdateAssistantPayload,
} from './elevenlabs-api.models';

@Injectable({
    providedIn: 'root',
})
export class ElevenLabsApiService {
    private readonly http = inject(HttpClient);
    private readonly apiKeyService = inject(SessionApiKeyService);

    private readonly baseUrl = 'https://api.elevenlabs.io/v1';

    private createHeaders(): HttpHeaders {
        const apiKey = this.apiKeyService.getApiKey();

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
        });
    }

    createPhoneNumber(payload: CreatePhoneNumberPayload): Observable<unknown> {
        return this.http.post(
            `${this.baseUrl}/convai/phone-numbers`,
            {
                provider: 'sip_trunk',
                label: payload.label,
                phone_number: payload.phoneNumber,
                outbound_trunk_config: {
                    address: payload.address,
                    credentials: {
                        username: payload.username,
                        password: payload.password,
                    },
                    transport: 'tls',
                    media_encryption: 'disabled',
                },
                inbound_trunk_config: {
                    media_encryption: 'disabled',
                },
            },
            {
                headers: this.createHeaders(),
            }
        );
    }

    updateAssistant(payload: UpdateAssistantPayload): Observable<unknown> {
        return this.http.patch(
            `${this.baseUrl}/convai/agents/${payload.agentId}`,
            {
                conversation_config: {
                    agent: {
                        first_message: payload.firstMessage,
                    },
                },
            },
            {
                headers: this.createHeaders(),
            }
        );
    }

    createBatchCall(payload: CreateBatchCallPayload): Observable<unknown> {
        return this.http.post(
            `${this.baseUrl}/convai/batch-calls`,
            {
                call_name: payload.callName,
                agent_id: payload.agentId,
                agent_phone_number_id: payload.agentPhoneNumberId,
                recipients: [
                    {
                        phone_number: payload.recipientPhoneNumber,
                        // conversation_initiation_client_data: {
                        //     dynamic_variables: {
                        //         first_name: payload.recipientName,
                        //         agent_name: payload.assistantName,
                        //     },
                        // },
                    },
                ],
            },
            {
                headers: this.createHeaders(),
            }
        );
    }
}
