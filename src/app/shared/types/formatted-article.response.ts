import { SearchArticle } from "@store/query/search/responses/articles.response";
import {ArticleInfoImage, ArticleInfoProperties} from "@store/query/articles/responses/article-info.response";

export type FormattedArticleResponse = {
    fastest: SearchArticle;
    cheapest: SearchArticle;
    articles: SearchArticle[];
    images: ArticleInfoImage[];
    properties?: ArticleInfoProperties;
} & Partial<Record<keyof SearchArticle, string>>;