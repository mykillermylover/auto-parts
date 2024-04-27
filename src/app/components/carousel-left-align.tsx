import React, {useRef} from 'react';
import {ICarouselInstance} from 'react-native-reanimated-carousel';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel/src/Carousel';
import {type TCarouselProps} from 'react-native-reanimated-carousel/src/types';

const PAGE_WIDTH = Dimensions.get('screen').width;

type CarouselLeftAlignProps = {
    data: TCarouselProps['data'];
    loop?: boolean;
    autoPlay?: boolean;
    renderItem: TCarouselProps['renderItem'];
    pagingEnabled?: boolean;
}

export const CarouselLeftAlign = ({
    data,
    loop = false,
    autoPlay = false,
    renderItem,
    pagingEnabled = false
}: CarouselLeftAlignProps) => {
    const ref =useRef<ICarouselInstance>(null);

    const baseOptions = {
        vertical: false,
        width: PAGE_WIDTH * 0.35,
        height: PAGE_WIDTH / 2,
    } as const;

    return (
        <Carousel
            {...baseOptions}
            loop={loop}
            ref={ref}
            style={{width: '100%'}}
            autoPlay={autoPlay}
            data={data}
            pagingEnabled={pagingEnabled}
            renderItem={renderItem}
        />
    );
};
