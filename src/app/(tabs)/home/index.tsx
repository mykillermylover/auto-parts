import React from 'react';
import { VStack } from 'react-native-flex-layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Card } from 'react-native-paper';

import { AnimatedSearch } from '@shared/components/search/animated-search';
import { DismissKeyboardHOC } from '@shared/features/dismiss-keyboard.hoc';
import { CarouselLeftAlign } from '@components/carousel-left-align';
import { AnimationConstants, AppConstants } from '@shared/consts';

const KeyboardDismissVStack = DismissKeyboardHOC(VStack);

export default function FirstHomeTab() {
    const carouselHeight = useSharedValue(200);

    const handleFocus = () => {
        carouselHeight.value = withTiming(0, AnimationConstants.timingConfig);
    };
    const handleBlur = () => {
        carouselHeight.value = withTiming(200, AnimationConstants.timingConfig);
    };

    return (
        <KeyboardDismissVStack fill items='center' spacing={16}>
            <SafeAreaView/>

            <Animated.View
                style={{
                    height: carouselHeight,
                    width: '100%',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <CarouselLeftAlign
                    pagingEnabled={true}
                    data={[...new Array(6).keys()]}
                    renderItem={() => (
                        <Card mode='contained' style={{ flex: 1, marginLeft: 8, borderRadius: 35 }}>
                            <Card.Cover source={AppConstants.imagePlaceholder}/>
                        </Card>
                    )}
                />
            </Animated.View>

            <VStack ph={16} w='100%'>
                <AnimatedSearch onBlur={handleBlur} onFocus={handleFocus}/>
            </VStack>

        </KeyboardDismissVStack>
    );
}
