import HttpClient from '@httpClient';
import {ArticlesBrandsResponse} from '@services/api/articles/articles-brands.response';
import axios from 'axios';
import {ArticleInfoResponse} from '@services/api/articles/article-info.response';
import {ArticleInfoProp} from '@services/api/articles/article-info.prop';

export class ArticlesService {
    http = HttpClient;
    url = '/articles';

    async articlesGetAllBrands() {
        const { data } = await this.http.get<ArticlesBrandsResponse>(`${this.url}/brands`);
        return data;
    }
    // ## API-admin use
    async articleInfo(item: ArticleInfoProp) {
        const { data } = await axios.get<ArticleInfoResponse>(`${this.url}/info`,
            {
                params: {
                    userlogin: process.env.ADMIN_LOGIN,
                    userpsw: process.env.ADMIN_PASSWORD,
                    ...item
                }
            });

        return data;
    }
}
