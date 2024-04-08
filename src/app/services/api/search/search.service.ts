import HttpClient from '@httpClient';
import {SearchBrandsObjectResponse, searchBrandsObjectToArray} from './responses/brands.response';
import {SearchArticlesResponse} from './responses/articles.response';
import {SearchConstants} from '@consts';
import {SearchHistoryResponse} from './responses/history.response';
import {SearchTipsResponse} from './responses/tips.response';
import {SearchAdvicesResponse} from './responses/advices.response';
import {ItemModel} from '@shared/models/item.model';

export class SearchService {
    private http = HttpClient;
    private url = '/search';

    async searchBrands(number: number | string) {
        const response = await this.http.get<SearchBrandsObjectResponse>(`${this.url}/brands`,
            {
                params: {
                    number,
                }
            });
        return searchBrandsObjectToArray(response.data);
    }

    async searchArticles(number: number | string, brand: string) {
        const response = await this.http.get<SearchArticlesResponse>(`${this.url}/articles`,
            {
                params: {
                    number,
                    brand
                }
            });

        return response.data;
    }

    async searchBatch(search: { number: string, brand: string | number }[]) {
        const response = await this.http.post<SearchArticlesResponse>(`${this.url}/batch`, null, {
            params: {
                search
            }
        });

        return response.data;
    }

    async searchHistory() {
        const response = await this.http.get<SearchHistoryResponse>(`${this.url}/history`);

        return response.data;
    }

    async searchTips(number: string | number) {
        const response = await this.http.get<SearchTipsResponse>(`${this.url}/tips`,
            {
                params: {
                    number
                }
            });

        return response.data;
    }

    async searchAdvices({brand, number}: ItemModel, limit = SearchConstants.advicesLimit) {
        const response = await this.http.get<SearchAdvicesResponse>('/advices',
            {
                params: {
                    brand,
                    number,
                    limit
                }
            });

        return response.data;
    }

    async searchAdvicesBatch(articles: ItemModel[], limit = SearchConstants.advicesLimit) {
        type AdvicesBatchResponse = ItemModel | { advices: ItemModel[] }

        const response = await this.http.post<AdvicesBatchResponse[]>('/advices/batch', {articles, limit});

        return response.data;
    }
}
