import React from 'react';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

interface OrderCheckoutLinkProps {
    dataIds: string[],
}

export const OrderCheckoutLink = ({ dataIds }: OrderCheckoutLinkProps) => {

    const redirect = () => {
        router.navigate({
            pathname: 'cart/order-checkout',
            params: { keys: JSON.stringify(dataIds) }
        })
    }

    return (
        <Button
            mode='contained'
            contentStyle={{ flexDirection: 'row-reverse' }}
            icon={{ source: 'arrow-right', direction: 'auto' }}
            onPress={redirect}
        >
            К оформлению
        </Button>
    )
}