export interface CreatePhoneNumberPayload {
    label: string;
    phoneNumber: string;
    address: string;
    username: string;
    password: string;
}

export interface UpdateAssistantPayload {
    agentId: string;
    firstMessage: string;
}

export interface CreateBatchCallPayload {
    callName: string;
    agentId: string;
    agentPhoneNumberId: string;
    recipientPhoneNumber: string;
    recipientName: string;
    assistantName: string;
}
