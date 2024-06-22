import React, { useMemo, useState } from 'react';
import { HStack } from 'react-native-flex-layout';
import { useListQuickDetailQuery } from '@store/query/laximo/laximo.api';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import {
    defaultListQuickDetailResponse,
    ListQuickDetailCategory,
    ListQuickDetailDetail,
    ListQuickDetailUnit
} from '@store/query/laximo/responses/list-quick-detail.response';
import { APP_MARGIN } from '@shared/consts/app.const';
import { MaterialActivityIndicator } from '@shared/components/material-activity-indicator';
import { FlashList } from '@shopify/flash-list';
import { QuickGroupDetailDialogContent } from '@components/catalogue/quick-group-detail-dialog-content';
import { QuickGroupDetailUnit } from '@components/catalogue/quick-group-detail-unit';

export default function QuickGroupDetail() {

    const { colors } = useTheme();

    const [currentDetail, setCurrentDetail] = useState({} as ListQuickDetailDetail);
    const [dialogVisible, setDialogVisible] = useState(false);

    const queryParams = useLocalSearchParams<{
        brand: string,
        quickGroupId: string,
        vehicleId: string,
        ssd: string,
        catalog: string,
    }>();
    const {
        data: { Category: categories } = defaultListQuickDetailResponse,
        isFetching,
        isLoading,
        refetch
    } = useListQuickDetailQuery(queryParams);

    const flatCategories = useMemo(() =>
        categories.flatMap(category => {
            const { Unit, ...rest } = category;
            return [
                rest,
                ...Unit
            ]
        }),
    [categories]);

    const stickyHeaderIndices = useMemo(() => {
        return flatCategories.flatMap((item, index) => {
            if ((item as ListQuickDetailCategory).categoryid) {
                return index;
            } else return [];
        })
    }, [flatCategories]);

    const showDialog = () => setDialogVisible(true);
    const hideDialog = () => setDialogVisible(false);
    const handlePress = (detail: ListQuickDetailDetail) => {
        setCurrentDetail(detail);
        showDialog()
    }

    if (isLoading) return <MaterialActivityIndicator/>
    return (
        <>
            <FlashList
                refreshing={isFetching}
                onRefresh={refetch}
                estimatedItemSize={380}
                data={flatCategories}
                renderItem={({ item: category }) => {
                    if ((category as ListQuickDetailCategory).categoryid) {
                        return (
                            <HStack style={[styles.listHeader]} bg={colors.background}>
                                <Text variant='titleLarge'>{category.name}</Text>
                            </HStack>
                        )
                    }
                    const unit = category as ListQuickDetailUnit;

                    return (
                        <QuickGroupDetailUnit
                            unit={unit}
                            brand={queryParams.brand}
                            handleInfoPress={handlePress}
                        />
                    )
                }}
                getItemType={(item) => {
                    if ((item as ListQuickDetailCategory).categoryid)
                        return 'category'
                    else
                        return 'unit'
                }}
                stickyHeaderIndices={stickyHeaderIndices}
            />

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Title>Подробности</Dialog.Title>
                    <QuickGroupDetailDialogContent detail={currentDetail}/>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    cardContent: {
        minHeight: 72,
        // overflow: 'hidden',
        paddingHorizontal: APP_MARGIN,
    },
    listHeader: {
        paddingVertical: APP_MARGIN,
        paddingHorizontal: APP_MARGIN * 2,
        marginBottom: -APP_MARGIN,
        paddingBottom: APP_MARGIN / 2,
        flex: 1,
    },
})