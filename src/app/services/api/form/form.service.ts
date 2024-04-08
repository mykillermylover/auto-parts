import HttpClient from '@httpClient';
import {FormConstants} from '@consts';

export class FormService {
    http = HttpClient;
    url = '/form';

    async formFields(name: FormConstants.FormName, locale?: string) {
        const { data } = await this.http.get(`${this.url}/fields`,
            {
                params: {
                    name,
                    locale
                }
            });
        return data;
    }
}
