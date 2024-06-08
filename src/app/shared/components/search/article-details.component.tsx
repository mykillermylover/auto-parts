import React, { useMemo } from 'react';
import { FormattedArticle } from '@shared/types/formatted-article.response';
import { FlashList } from '@shopify/flash-list';
import { useCartAddItemsMutation } from '@store/query/cart/cart.api';
import { OrderPositionModel } from '@shared/models/order-position.model';
import { ToastService } from '@services/toast.service';
import { ResponseService } from '@services/response.service';
import { NetworkError } from '@shared/errors/network.error';
import { SearchArticle } from '@store/query/search/responses/articles.response';
import { ArticleDetailsItem } from '@components/article/article-details-item';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { BottomSheetScrollView, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { AppConstants } from '@shared/consts';
import { cartContentFromSearchArticleCartAddResult } from '@shared/types/cart-content-meta';
import { useAppDispatch } from '@shared/hooks';
import { CartActions } from '@store/cart/cart.store';
import { APP_MARGIN } from '@shared/consts/app.const';
import { Flex } from 'react-native-flex-layout';
import { useTheme } from 'react-native-paper';

interface DetailsProps {
    item: FormattedArticle
}

const MARGIN = AppConstants.APP_MARGIN;

export const ArticleDetails = ({ item }: DetailsProps) => {
    const { roundness } = useTheme();
    const dispatch = useAppDispatch();
    const [addToCart] = useCartAddItemsMutation();

    const CAROUSEL_WIDTH = useMemo(() => SCREEN_WIDTH - 2 * MARGIN, []);
    const images = item.images ? item.images.map((image) => image.name) : [];

    const handleAddToCart = async (item: SearchArticle, quantity: number) => {
        try {
            const cartAddItem: OrderPositionModel = {
                ...item,
                quantity,
                comment: ''
            }
            const result = await addToCart([cartAddItem]).unwrap();

            if (result.errorMessage) ToastService.error(result.errorMessage);
            else {
                ToastService.success(`Позиция ${item.brand} ${item.number} (${quantity} шт.) добавлена в корзину`);

                const cartItem = cartContentFromSearchArticleCartAddResult(item, result.positions[0], images);
                dispatch(CartActions.addItem(cartItem));
            }
        } catch (e) {
            const errorMessage = ResponseService.getErrorMessage(e as NetworkError);
            ToastService.error(errorMessage);
        }
    }

    return (
        <Flex fill minH={300} mh={APP_MARGIN} mb={APP_MARGIN * 4} radius={roundness * 3} overflow={'hidden'}>
            <FlashList
                contentContainerStyle={{
                    paddingBottom: APP_MARGIN
                }}
                estimatedItemSize={300}
                ListHeaderComponent={<ArticleCardCover width={CAROUSEL_WIDTH} height={200} images={images}/>}
                data={item.articles}
                renderItem={({ item }) =>
                    <ArticleDetailsItem
                        item={item}
                        handleAddToCart={handleAddToCart}
                        cardStyle={{
                            marginTop: 8
                        }}
                    />}
                keyExtractor={item => item.itemKey}
                //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                renderScrollComponent={BottomSheetScrollView}
            />
        </Flex>
    )
}