import React, { useCallback, useMemo, useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { ItemModel } from '@shared/models/item.model';
import { useArticleInfoQuery } from '@store/query/local/local.api';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { ArticleItem } from '@components/article-item';
import { defaultArticle, defaultArticleResponse } from '@shared/consts/search.const';
import { Button, HelperText, Surface, Text } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import { ArticleDetails } from '@shared/components/search/article-details.component';
import { FormattedArticle } from '@shared/types/formatted-article.response';
import { Flex, VStack } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';
import { StyleSheet } from 'react-native';
import { MaterialBottomSheetBase } from '@shared/components/bottom-sheet/material-bottom-sheet-base';
import { isObjectEmpty } from '@shared/features/is-object-empty';

const numColumns = 2;

export default function Search() {
    const item: ItemModel = useLocalSearchParams<{ brand: string, number: string }>();
    const { data = defaultArticleResponse, isFetching, isError, refetch } = useArticleInfoQuery(item);

    const [currentItem, setCurrentItem] = useState(defaultArticle);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const listItems = useMemo(() => {
        const dataItems = isObjectEmpty(data.item) ? [] : ['Искомый артикул', ...data.item];
        const dataCrosses = !data.crosses.length ? [] : ['Аналоги', ...data.crosses];

        if (!dataItems.length && !dataCrosses.length) return [];

        return [...dataItems, ...dataCrosses];
    }, [data])
    const stickyHeaderIndices = useMemo(() => {
        return listItems
            .map((item, index) => {
                return typeof item === 'string' ?
                    index : null
            }).filter(item => item !== null) as number[];
    }, [listItems])

    const openBottomSheet = useCallback((value: FormattedArticle) => {
        setCurrentItem(value);
        bottomSheetRef.current?.snapToIndex(0);
    }, []);
    const itemAliases = useMemo(() => data.item.length > 1, [data]);
    const overrideItemLayout: FlashListProps<FormattedArticle | string>['overrideItemLayout'] = (layout, item, index, maxColumns) => {
        if ((index === 1 && !itemAliases) || typeof item === 'string') {
            layout.span = maxColumns;
        }
    };

    if (isError) {
        return (
            <VStack fill center spacing={APP_MARGIN}>
                <Text>Нет результатов</Text>
                <Button mode='outlined' onPress={router.back}>Назад</Button>
            </VStack>
        )
    }

    return (
        <>
            <FlashList
                overrideItemLayout={overrideItemLayout}
                ListEmptyComponent={() => {
                    return (
                        <Flex fill center>
                            <HelperText type='info'>
                                {isFetching ? 'Загрузка...' : 'Нет результатов'}
                            </HelperText>
                        </Flex>
                    )
                }}
                onRefresh={refetch}
                refreshing={isFetching}
                estimatedItemSize={450}
                numColumns={numColumns}
                data={listItems}
                renderItem={({ item, index }) => {
                    if (typeof item === 'string') {
                        return (
                            <Surface mode='flat' style={[styles.listHeader]}>
                                <Text>{item}</Text>
                            </Surface>
                        )
                    } else {
                        return (
                            <ArticleItem
                                containerStyle={{ flex: 1 }}
                                onPress={() => openBottomSheet(item)}
                                numColumns={(index === 1 && !itemAliases) ? 1 : numColumns}
                                article={item}
                            />
                        )
                    }
                }}
                getItemType={(item) => {
                    return typeof item === 'string' ? 'sectionHeader' : 'row'
                }}
                stickyHeaderIndices={stickyHeaderIndices}
            />
            <MaterialBottomSheetBase
                bottomSheetRef={bottomSheetRef}
                enablePanDownToClose
                enableDynamicSizing
                snapPoints={[520]}
                style={styles.bottomSheet}
            >
                <ArticleDetails item={currentItem}/>
            </MaterialBottomSheetBase>
        </>
    );
}

const styles = StyleSheet.create({
    listHeader: {
        padding: APP_MARGIN,
        borderBottomWidth: 0.3,
        borderBottomColor: '#40404033',
        flex: 1,
    },
    bottomSheet: {
        marginTop: APP_MARGIN * 4,
    }
})