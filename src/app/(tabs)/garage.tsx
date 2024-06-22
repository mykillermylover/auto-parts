import React from 'react';
import { useGarageListQuery } from '@store/query/garage/garage.api';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialActivityIndicator } from '@shared/components/material-activity-indicator';
import { CarCard } from '@components/garage/car-card';

export default function GarageComponent() {

    const { data = [], isFetching, isLoading, refetch } = useGarageListQuery();

    if (isLoading) return <MaterialActivityIndicator/>

    return (
        <>
            <SafeAreaView/>
            <FlashList
                estimatedItemSize={130}
                refreshing={isFetching}
                onRefresh={refetch}
                data={data}
                renderItem={({ item: car }) => <CarCard car={car}/>}
            />
        </>
    );
}
