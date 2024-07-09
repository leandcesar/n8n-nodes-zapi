import type { INodeProperties } from 'n8n-workflow';

export const sendMessageOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['send-message'],
            },
        },
        options: [
            {
                name: 'Send Text',
                value: 'send-text',
                description: 'Send text message',
                action: 'Send text',
            },
            {
                name: 'Send Options List',
                value: 'send-option-list',
                description: 'Send text message with options list',
                action: 'Send text with options list',
            },
            {
                name: 'Send Audio',
                value: 'send-audio',
                description: 'Send audio message',
                action: 'Send audio',
            },
            {
                name: 'Send Document',
                value: 'send-document',
                description: 'Send document message',
                action: 'Send document',
            },
            {
                name: 'Send Image',
                value: 'send-image',
                description: 'Send image message',
                action: 'Send image',
            },
            {
                name: 'Send Sticker',
                value: 'send-sticker',
                description: 'Send sticker message',
                action: 'Send sticker',
            },
            {
                name: 'Send GIF',
                value: 'send-gif',
                description: 'Send GIF message',
                action: 'Send GIF',
            },
            {
                name: 'Send Video',
                value: 'send-video',
                description: 'Send video message',
                action: 'Send video',
            },
            {
                name: 'Send PTV',
                value: 'send-ptv',
                description: 'Send PTV message',
                action: 'Send PTV',
            },
            {
                name: 'Send Location',
                value: 'send-location',
                description: 'Send location message',
                action: 'Send location',
            },
        ],
        default: 'send-text',
    },
];

export const sendMessageFields: INodeProperties[] = [
    {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        placeholder: '5511999999999',
        required: true,
        displayOptions: {
            show: {
                operation: ['send-text', 'send-option-list', 'send-audio', 'send-document', 'send-image', 'send-sticker', 'send-gif', 'send-video', 'send-ptv', 'send-location', 'send-contact', 'send-contacts', 'send-poll', 'send-event'],
                resource: ['send-message'],
            },
        },
        description: 'The phone number to which to send the message',
    },
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        default: '',
        placeholder: 'Enter your message...',
        required: true,
        displayOptions: {
            show: {
                operation: ['send-text', 'send-option-list'],
                resource: ['send-message'],
            },
        },
        description: 'Text to be sent',
    },
    {
        displayName: 'Button Label',
        name: 'optionListButtonLabel',
        type: 'string',
        default: '',
        placeholder: 'See options',
        required: true,
        displayOptions: {
            show: {
                operation: ['send-option-list'],
                resource: ['send-message'],
            },
        },
        description: 'Button Label to be sent',
    },
    {
        displayName: 'Options Title',
        name: 'optionListTitle',
        type: 'string',
        default: '',
        placeholder: 'Options available',
        required: true,
        displayOptions: {
            show: {
                operation: ['send-option-list'],
                resource: ['send-message'],
            },
        },
        description: 'Button Label to be sent',
    },
    {
        displayName: 'Options',
        name: 'optionList',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        default: {},
        placeholder: 'Add Option',
        required: true,
        displayOptions: {
            show: {
                operation: ['send-option-list'],
                resource: ['send-message'],
            },
        },
        options: [
            {
                name: 'property',
                displayName: 'Option',
                values: [
                    {
                        displayName: 'Option Title',
                        name: 'optionTitle',
                        type: 'string',
                        default: '',
                        required: true,
                        description: 'Title of the option to set',
                    },
                    {
                        displayName: 'Option Description',
                        name: 'optionDescription',
                        type: 'string',
                        default: '',
                        description: 'Description of the option to set',
                    },
                    {
                        displayName: 'Option ID',
                        name: 'optionId',
                        type: 'string',
                        default: '',
                        description: 'ID of the option to set',
                    },
                ],
            },
        ],
        description: 'Adds a option to set also values which have not been predefined',
    },
    {
        displayName: 'URL or base64',
        name: 'urlOrBase64',
        type: 'string',
        default: '',
        placeholder: 'https://www.sample.com/image.png',
        required: true,
        displayOptions: {
            show: {
                operation: ['send-audio', 'send-document', 'send-image', 'send-sticker', 'send-gif', 'send-video', 'send-ptv'],
                resource: ['send-message'],
            },
        },
        description: 'Media URL or base64 to be sent',
    },
    {
        displayName: 'Extension',
        name: 'extension',
        type: 'string',
        default: '',
        placeholder: 'pdf',
        required: true,
        displayOptions: {
            show: {
                operation: ['send-document'],
                resource: ['send-message'],
            },
        },
        description: 'Document extension to be sent',
    },
    {
        displayName: 'View Once',
        name: 'viewOnce',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                operation: ['send-image', 'send-audio', 'send-video'],
                resource: ['send-message'],
            },
        },
        description: 'Specifies whether the message will be a view-once message or not',
    },
    {
        displayName: 'Filename',
        name: 'fileName',
        type: 'string',
        default: '',
        placeholder: 'Example filename...',
        displayOptions: {
            show: {
                operation: ['send-document'],
                resource: ['send-message'],
            },
        },
        description: 'Document filename to be sent',
    },
    {
        displayName: 'Caption',
        name: 'caption',
        type: 'string',
        default: '',
        placeholder: 'Enter your message...',
        displayOptions: {
            show: {
                operation: ['send-image', 'send-video', 'send-document'],
                resource: ['send-message'],
            },
        },
        description: 'Text caption to be sent',
    },
    {
        displayName: 'Title location',
        name: 'title',
        type: 'string',
        default: '',
        placeholder: 'Cloudia - Chatbot para clínicas',
        displayOptions: {
            show: {
                operation: ['send-location'],
                resource: ['send-message'],
            },
        },
        description: 'Title location to be sent',
    },
    {
        displayName: 'Address location',
        name: 'address',
        type: 'string',
        default: '',
        placeholder: 'Av. Paulista 171, Pavimento 4 - Bela Vista, São Paulo - SP, 01311-000',
        displayOptions: {
            show: {
                operation: ['send-location'],
                resource: ['send-message'],
            },
        },
        description: 'Title location to be sent',
    },
    {
        displayName: 'Latitude',
        name: 'latitude',
        type: 'number',
        default: '',
        placeholder: '-23.570323',
        displayOptions: {
            show: {
                operation: ['send-location'],
                resource: ['send-message'],
            },
        },
        description: 'Latitude location to be sent',
    },
    {
        displayName: 'Longitude',
        name: 'longitude',
        type: 'number',
        default: '',
        placeholder: '-46.6508174',
        displayOptions: {
            show: {
                operation: ['send-location'],
                resource: ['send-message'],
            },
        },
        description: 'Longitude location to be sent',
    },
    {
        displayName: 'Message ID to Edit',
        name: 'editMessageId',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['send-text'],
                resource: ['send-message'],
            },
        },
        description: 'ID of the message to edit and the new content',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                operation: ['send-text', 'send-option-list', 'send-audio', 'send-document', 'send-image', 'send-sticker', 'send-gif', 'send-video', 'send-ptv', 'send-location', 'send-contact', 'send-contacts', 'send-poll', 'send-event'],
                resource: ['send-message'],
            },
        },
        default: {},
        options: [
            {
                displayName: 'Delay Message',
                name: 'delayMessage',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                    maxValue: 15,
                },
                default: 1,
                description: 'Delay in seconds before sending the message',
            },
            {
                displayName: 'Delay Typing',
                name: 'delayTyping',
                type: 'number',
                typeOptions: {
                    minValue: 0,
                    maxValue: 15,
                },
                default: 0,
                description: 'Delay in seconds showing "Typing..." status before sending the message',
            },
            {
                displayName: 'Message ID to Reply',
                name: 'messageId',
                type: 'string',
                default: '',
                description: 'ID of the message to reply to',
            },
        ]
    },
];
