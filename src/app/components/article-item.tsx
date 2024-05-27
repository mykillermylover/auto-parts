import { Button, Card, Divider, HelperText, Text, TouchableRipple } from 'react-native-paper';
import React, { useMemo } from 'react';
import { FormattedArticle } from '@shared/types/formatted-article.response';
import { Dimensions } from 'react-native';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { AppConstants } from '@shared/consts';

interface ArticleItemProps {
    article: FormattedArticle;
    onPress?: (() => void) | void;
}

const MARGIN = AppConstants.APP_MARGIN;
const SCREEN_WIDTH = Dimensions.get('screen').width;

export const ArticleItem = (
    {
        article,
        onPress = () => {},
        numColumns = 1
    }: ArticleItemProps & { numColumns?: number }) => {


    const images = useMemo(() => {
        return article?.images ? article.images.map((image) => image.name) : []
    },[article.images]);
    const CAROUSEL_WIDTH = useMemo(() => SCREEN_WIDTH / numColumns - 2 * MARGIN, [numColumns]);

    return (
        <Card
            style={{
                marginVertical: MARGIN / 2,
                marginHorizontal: MARGIN
            }}
        >
            <ArticleCardCover
                images={images}
                width={CAROUSEL_WIDTH}
                height={200}
            />
            <Card.Title title={article.brand} subtitle={article.number}/>
            <Card.Content>
                <Text>{article.description}</Text>
                <HelperText type='info'>От {article.cheapest.price} руб.</HelperText>
                <HelperText type='info'>Самый быстрый - {article.fastest.price} руб.</HelperText>
            </Card.Content>

            <Divider style={{ marginTop: 16 }}/>

            <TouchableRipple
                style={{
                    width: '100%',
                }}
                onPress={onPress}
            >
                <Button
                    icon={{
                        source: 'compare-vertical',
                        direction: 'auto'
                    }}
                >
                    Подробнее
                </Button>
            </TouchableRipple>
        </Card>
    )
}