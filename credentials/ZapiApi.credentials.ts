import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class ZapiApi implements ICredentialType {
    name = 'zapiApi';
    displayName = 'Z-API API';
    documentationUrl = 'https://developer.z-api.io/';
    properties: INodeProperties[] = [
        {
            displayName: 'Instance ID',
            name: 'instanceId',
            type: 'string',
            default: '',
        },
        {
            displayName: 'Instance Token',
            name: 'instanceToken',
            type: 'string',
            typeOptions: { password: true },
            default: '',
        },
        {
            displayName: 'Client Token',
            name: 'clientToken',
            type: 'string',
            typeOptions: { password: true },
            default: '',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'Client-Token': '={{$credentials.clientToken}}',
            },
        },
    };
}