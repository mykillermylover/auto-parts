import { FormattedArticle, FormattedArticleResponse } from '@shared/types/formatted-article.response';
import { SearchArticle } from '@store/query/search/responses/articles.response';

export const advicesLimit = 5;

export const defaultArticle: FormattedArticle = {
    articles: [],
    cheapest: {} as SearchArticle,
    fastest: {} as SearchArticle,
    images: [],
    description: '',
}
export const defaultArticleResponse: FormattedArticleResponse = {
    item: defaultArticle,
    crosses: []
};

