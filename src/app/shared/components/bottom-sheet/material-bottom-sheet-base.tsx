import { TranslucentBackground } from '@shared/components/translucent-background';
import BottomSheet, { BottomSheetHandle, BottomSheetProps } from '@gorhom/bottom-sheet';
import { IconButton, useTheme } from 'react-native-paper';
import React, { RefObject, useCallback, useState } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MaterialBottomSheetBaseProps = Omit<BottomSheetProps, 'children'> & {
    bottomSheetRef: RefObject<BottomSheetMethods>,
    children: BottomSheetViewProps['children'],
    closeButton?: boolean,
    translucentBackground?: boolean;
}

export const MaterialBottomSheetBase = (
    {
        bottomSheetRef,
        translucentBackground,
        enableDynamicSizing,
        enablePanDownToClose,
        children,
        index,
        onClose,
        closeButton,
        snapPoints,
        onAnimate,
        onChange,
    }: MaterialBottomSheetBaseProps
) => {

    const theme = useTheme();
    const [backgroundVisibility, setBackgroundVisibility] = useState(false);

    const { top } = useSafeAreaInsets();

    const hide = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const handleAnimation = (from: number, to: number) => {
        if (from === -1) {    // open
            setBackgroundVisibility(true);
        } else if (to === -1) { // close
            setBackgroundVisibility(false);
        }
    }

    return (
        <>
            {translucentBackground &&
                <TranslucentBackground
                    onPress={hide}
                    visible={backgroundVisibility}
                />
            }
            <BottomSheet
                style={{
                    marginTop: top
                }}
                enableDynamicSizing={enableDynamicSizing}
                enablePanDownToClose={enablePanDownToClose}
                index={index}
                onClose={onClose}
                handleComponent={closeButton ? (props) => {
                    return (
                        <>
                            <BottomSheetHandle {...props} />
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                }}
                                icon={{
                                    source: 'close',
                                    direction: 'ltr'
                                }}
                                onPress={() => bottomSheetRef.current?.close()}
                            />
                        </>
                    )
                } : undefined}
                backgroundStyle={{ backgroundColor: theme.colors.background }}
                snapPoints={snapPoints}
                ref={bottomSheetRef}
                onChange={onChange}
                onAnimate={(fromIndex, toIndex) => {
                    handleAnimation(fromIndex, toIndex);
                    if (onAnimate) {
                        onAnimate(fromIndex, toIndex);
                    }
                }}
            >
                {children}
            </BottomSheet>
        </>
    )
}