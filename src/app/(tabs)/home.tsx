import React from 'react';
import {VStack} from 'react-native-flex-layout';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import {Surface, Text} from 'react-native-paper';
import {AnimatedSearch} from '@shared/components/search/animated-search';
import {DismissKeyboardHOC} from '@shared/components/dismiss-keyboard.hoc';

const AnimatedSurface = Animated.createAnimatedComponent(Surface);

const KeyboardDismissVStack = DismissKeyboardHOC(VStack);

export default function FirstHomeTab() {

    const height = useSharedValue(100);
    const handleFocus = () => {
        height.value = withSpring(0, {damping: 30});
    };
    const handleBlur = () => {
        height.value = withSpring(100, {damping: 30});
    };

    return (
        <KeyboardDismissVStack fill items='center' ph={20} spacing={30}>
            <SafeAreaView/>

            <AnimatedSurface
                style={{
                    height,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>Carousel</Text>
            </AnimatedSurface>


            <AnimatedSearch onBlur={handleBlur} onFocus={handleFocus}/>

        </KeyboardDismissVStack>
    );
}
