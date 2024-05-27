import React, { useCallback, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { ItemModel } from '@shared/models/item.model';
import { useArticleInfoQuery } from '@store/query/local/local.api';
import { FlashList } from '@shopify/flash-list';
import { ArticleItem } from '@components/article-item';
import { defaultArticleResponse } from '@shared/consts/search.const';
import { Text } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import { ArticleDetails } from '@shared/components/search/article-details.component';
import { FormattedArticle } from '@shared/types/formatted-article.response';
import { MaterialBottomSheetScrollView } from '@shared/components/bottom-sheet/material-bottom-sheet-scroll-view';

const numColumns = 1;

export default function Search() {
    const item: ItemModel = useLocalSearchParams<{ brand: string, number: string }>();
    const { data = defaultArticleResponse, isFetching, refetch } = useArticleInfoQuery(item);

    const [currentItem, setCurrentItem] = useState(data.item);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const openBottomSheet = useCallback((value: FormattedArticle) => {
        setCurrentItem(value);
        bottomSheetRef.current?.snapToIndex(0);
    },[]);

    return (
        <>
            <FlashList
                onRefresh={refetch}
                refreshing={isFetching}
                estimatedItemSize={450}
                contentContainerStyle={{
                    paddingVertical: 8
                }}
                numColumns={numColumns}
                ListHeaderComponent={
                    <>
                        <Text>Искомый артикул:</Text>
                        <ArticleItem onPress={() => openBottomSheet(data.item)} article={data.item}/>
                        <Text>Аналоги:</Text>
                    </>
                }
                data={data.crosses}
                renderItem={({ item }) => <ArticleItem onPress={() => openBottomSheet(item)} numColumns={numColumns} article={item}/>}
            />

            <MaterialBottomSheetScrollView
                bottomSheetRef={bottomSheetRef}
                snapPoints={[550]}
                enablePanDownToClose
                enableDynamicSizing
            >
                <ArticleDetails item={currentItem}/>
            </MaterialBottomSheetScrollView>
        </>
    );
}
