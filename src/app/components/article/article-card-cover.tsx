import React from 'react';
import { Card, CardCoverProps } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { MaterialCarouselDots } from '@shared/components/material-carousel-dots';

interface ArticleCarouselProps {
    style?: CardCoverProps['style'];
    images: string[];
    width: number;
    height?: number;
}

const imageUrlFull = 'https://pubimg.nodacdn.net/images/full';

export const ArticleCardCover = ({ images, width, height = width / 1.5, style }: ArticleCarouselProps) => {
    const progress = useSharedValue(0);

    if (images.length > 1) return (
        <View>
            <Carousel
                onProgressChange={progress}
                scrollAnimationDuration={300}
                vertical={false}
                height={height}
                width={width}
                style={[{
                    width,
                    height,
                }, style]}
                loop={false}
                data={images}
                renderItem={({ item }) =>
                    <Card.Cover
                        style={[{ width, height }, style]}
                        height={height}
                        width={width}
                        resizeMode='contain'
                        source={{
                            uri: `${imageUrlFull}/${item}`
                        }}
                    />
                }
            />
            <MaterialCarouselDots
                progress={progress}
                data={images}
            />
        </View>
    )

    return (
        <Card.Cover
            style={[{ width, height }, style]}
            height={height}
            width={width}
            resizeMode='contain'
            source={{
                uri: `${imageUrlFull}/${images[0]}`
            }}
        />
    )
}