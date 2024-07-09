import type {
    IExecuteFunctions,
    IHookFunctions,
    IDataObject,
    IHttpRequestMethods,
    IRequestOptions,
} from 'n8n-workflow';

/**
 * Make an API request to Z-API
 *
 */
export async function zapiApiRequest(
    this: IHookFunctions | IExecuteFunctions,
    method: IHttpRequestMethods,
    endpoint: string,
    body: IDataObject,
): Promise<any> {
    const credentials = (await this.getCredentials('zapiApi')) as {
        instanceId: string;
        instanceToken: string;
        clientToken: string;
    };

    const options: IRequestOptions = {
        method,
        body,
        uri: `https://api.z-api.io/instances/${credentials.instanceId}/token/${credentials.instanceToken}/${endpoint}`,
        json: true,
    };

    return await this.helpers.requestWithAuthentication.call(this, 'zapiApi', options);
}
