import React from "react";
import {VStack} from "react-native-flex-layout";
import {Button, Text} from "react-native-paper";
import {useCartContentQuery} from "@store/query/cart/cart.api";
import {ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Cart() {
    const {data, isFetching, refetch} = useCartContentQuery();
    return (
        <VStack fill center>
            <SafeAreaView/>
            <ScrollView>
                <Text>{JSON.stringify(data, null, 2)}</Text>
            </ScrollView>
            <Button loading={isFetching} disabled={isFetching} onPress={refetch}>ReFetch</Button>
        </VStack>
    )
}