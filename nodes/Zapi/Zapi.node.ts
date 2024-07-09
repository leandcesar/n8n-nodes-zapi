import type {
    IExecuteFunctions,
    IDataObject,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IHttpRequestMethods,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { zapiApiRequest } from './GenericFunctions';
import { sendMessageFields, sendMessageOperations } from './SendMessageDescription';

export class Zapi implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Z-API',
        name: 'zapi',
        icon: 'file:zapi.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Send messages',
        defaults: {
            name: 'Z-API',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'zapiApi',
                required: true,
            },
        ],
        properties: [
            // ----------------------------------
            //         resources
            // ----------------------------------
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Send Message',
                        value: 'send-message',
                    },
                ],
                default: 'send-message',
            },
            // ----------------------------------
            //         operations
            // ----------------------------------
            ...sendMessageOperations,
            // ----------------------------------
            //         fields
            // ----------------------------------
            ...sendMessageFields,
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: IDataObject[] = [];

        let operation: string;
        let resource: string;
        let body: IDataObject;
        let requestMethod: IHttpRequestMethods;
        let endpoint: string;

        for (let i = 0; i < items.length; i++) {
            try {
                requestMethod = 'GET';
                endpoint = '';
                body = {};
                resource = this.getNodeParameter('resource', i);
                operation = this.getNodeParameter('operation', i);
                if (resource === 'send-message') {
                    requestMethod = 'POST';
                    endpoint = operation;
                    body.phone = this.getNodeParameter('phone', i) as string;
                    if (operation === 'send-text') {
                        body.message = this.getNodeParameter('text', i) as string;
                    } else if (operation === 'send-option-list') {
                        const optionList = this.getNodeParameter('optionList', i) as IDataObject;
                        const options = (optionList.property as IDataObject[]).map((option: IDataObject) => {
                            return {
                                id: option.optionId,
                                description: option.optionDescription,
                                title: option.optionTitle,
                            };
                        });
                        body.message = this.getNodeParameter('text', i) as string;
                        body.optionList = {
                            title: this.getNodeParameter('optionListTitle', i) as string,
                            buttonLabel: this.getNodeParameter('optionListButtonLabel', i) as string,
                            options: options,
                        };
                    } else if (operation === 'send-audio') {
                        body.audio = this.getNodeParameter('urlOrBase64', i) as string;
                        body.viewOnce = this.getNodeParameter('viewOnce', i) as string;
                    } else if (operation === 'send-document') {
                        endpoint = operation + '/' + this.getNodeParameter('extension', i) as string;;
                        body.document = this.getNodeParameter('urlOrBase64', i) as string;
                        body.caption = this.getNodeParameter('caption', i) as string;
                        body.fileName = this.getNodeParameter('fileName', i) as string;
                    } else if (operation === 'send-image') {
                        body.image = this.getNodeParameter('urlOrBase64', i) as string;
                        body.caption = this.getNodeParameter('caption', i) as string;
                        body.viewOnce = this.getNodeParameter('viewOnce', i) as string;
                    } else if (operation === 'send-sticker') {
                        body.sticker = this.getNodeParameter('urlOrBase64', i) as string;
                    } else if (operation === 'send-gif') {
                        body.gif = this.getNodeParameter('urlOrBase64', i) as string;
                    } else if (operation === 'send-video') {
                        body.video = this.getNodeParameter('urlOrBase64', i) as string;
                        body.caption = this.getNodeParameter('caption', i) as string;
                        body.viewOnce = this.getNodeParameter('viewOnce', i) as string;
                    } else if (operation === 'send-ptv') {
                        body.ptv = this.getNodeParameter('urlOrBase64', i) as string;
                    } else if (operation === 'send-location') {
                        body.title = this.getNodeParameter('title', i) as string;
                        body.address = this.getNodeParameter('address', i) as string;
                        body.latitude = this.getNodeParameter('latitude', i) as string;
                        body.longitude = this.getNodeParameter('longitude', i) as string;
                    } else {
                        throw new NodeOperationError(
                            this.getNode(),
                            `The operation "${operation}" is not known!`,
                            { itemIndex: i },
                        );
                    }
                    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
                    if (additionalFields) {
                        if (additionalFields.delayMessage) {
                            body.delayMessage = additionalFields.delayMessage;
                        }
                        if (additionalFields.delayTyping) {
                            body.delayTyping = additionalFields.delayTyping;
                        }
                        if (additionalFields.messageId) {
                            body.messageId = additionalFields.messageId;
                        }
                    }
                } else {
                    throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not known!`, {
                        itemIndex: i,
                    });
                }
                const responseData = await zapiApiRequest.call(this, requestMethod, endpoint, body);
                returnData.push(responseData as IDataObject);
            } catch (error) {
                if (this.continueOnFail(error)) {
                    returnData.push({ error: error.message });
                    continue;
                }
                throw error;
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}