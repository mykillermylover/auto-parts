import HttpClient from "../httpClient";
import {BrandsResponse} from "../http/responses/search/brands.response";
import {Article, ArticlesResponse} from "../http/responses/search/articles.response";
import {SearchConstants} from '../consts'

export class SearchService {
    private http = HttpClient;
    private url = '/search';

    brands(number: number | string) {
        return this.http.get<BrandsResponse>(`${this.url}/brands`,
            {
                params: {
                    number,
                }
            });
    }

    articles(number: number | string, brand: string) {
        return this.http.get<ArticlesResponse>(`${this.url}/articles`,
            {
                params: {
                    number,
                    brand
                }
            })
    }

    batch(search: { number: string, brand: string | number }[]) {
        return this.http.post(`${this.url}/batch`, null, {
            params: {
                search
            }
        })
    }

    history() {
        return this.http.get(`${this.url}/history`);
    }

    tips(number: string | number) {
        return this.http.get(`${this.url}/tips`,
            {
                params: {
                    number
                }
            });
    }

    advices(number: string | number, limit = SearchConstants.advicesLimit) {
        return this.http.get(`/advices`,
            {
                params: {
                    number,
                    limit
                }
            })
    }

    advicesBatch(articles: Article[]) {

    }
}
