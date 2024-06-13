import { SearchArticle } from '@store/query/search/responses/articles.response';
import { ArticleInfoImage, ArticleInfoProperties } from '@store/query/articles/responses/article-info.response';

export type FormattedArticle = {
    fastest: SearchArticle;
    cheapest: SearchArticle;
    articles: SearchArticle[];
    images: ArticleInfoImage[];
    properties?: ArticleInfoProperties;
    description: string;
} & Partial<Record<keyof SearchArticle, string>>;

export interface FormattedArticleResponse {
    item: FormattedArticle[];
    crosses: FormattedArticle[];
}