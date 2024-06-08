import React from 'react';
import { Card, CardCoverProps, useTheme } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { MaterialCarouselDots } from '@shared/components/material-carousel-dots';

interface ArticleCarouselProps {
    imageWrapperStyle?: CardCoverProps['style'];
    images: string[];
    width: number;
    height?: number;
}

const imageUrlFull = 'https://pubimg.nodacdn.net/images/full';

export const ArticleCardCover = ({ images, width, height = width / 1.5, imageWrapperStyle }: ArticleCarouselProps) => {
    const { roundness } = useTheme();

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
                    borderRadius: 3 * roundness
                }, imageWrapperStyle]}
                loop={false}
                data={images}
                renderItem={({ item }) => 
                    <Card.Cover
                        style={[{ width, height }]}
                        height={height}
                        width={width}
                        resizeMode='contain'
                        source={{ uri: `${imageUrlFull}/${item}` }}
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
            style={[{ width, height }, imageWrapperStyle]}
            height={height}
            width={width}
            resizeMode='contain'
            source={{ uri: `${imageUrlFull}/${images[0]}` }}
        />
    )
}