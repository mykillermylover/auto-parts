import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Dimensions, Pressable } from 'react-native';
import React, { useCallback, useEffect } from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface TranslucentBackgroundProps {
    onPress?: () => void,
    visible: boolean
}

export const TranslucentBackground = (
    {
        onPress,
        visible
    }: TranslucentBackgroundProps
) => {

    useEffect(() => {
        visible ?
            show() :
            hide()
    }, [visible]);

    const background = useSharedValue(false);
    const opacity = useSharedValue(0.3);

    const hide = useCallback(() => {
        opacity.value = withTiming(0, {
            duration: 150,
            easing: Easing.quad
        }, () => background.value = false);
    }, []);
    const show = useCallback(() => {
        background.value = true
        opacity.value = withTiming(0.5, {
            duration: 150,
            easing: Easing.quad
        });
    }, []);

    const displayStyle = useAnimatedStyle(() => ({
        display: background.value ? 'flex' : 'none',
    }))

    return (
        <Animated.View
            style={[{
                position: 'absolute',
                width: windowWidth,
                height: windowHeight,
                bottom: 0,
                backgroundColor: 'black',
                opacity,
            }, displayStyle]}
        >
            <Pressable style={{flex: 1}} onPress={onPress}>
            </Pressable>
        </Animated.View>
    )
}