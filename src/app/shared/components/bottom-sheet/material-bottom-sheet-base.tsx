import { TranslucentBackground } from '@shared/components/translucent-background';
import BottomSheet, { BottomSheetHandle, BottomSheetProps } from '@gorhom/bottom-sheet';
import { IconButton, useTheme } from 'react-native-paper';
import React, { RefObject, useCallback, useState } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import { APP_MARGIN } from '@shared/consts/app.const';

export type MaterialBottomSheetBaseProps = Omit<BottomSheetProps, 'children'> & {
    bottomSheetRef: RefObject<BottomSheetMethods>,
    children: BottomSheetViewProps['children'],
    closeButton?: boolean,
    translucentBackground?: boolean;
}

export const MaterialBottomSheetBase = (
    {
        bottomSheetRef,
        translucentBackground = true,
        enableDynamicSizing,
        enablePanDownToClose,
        children,
        index = -1,
        onClose,
        closeButton = true,
        snapPoints,
        onAnimate,
        onChange,
        ...props
    }: MaterialBottomSheetBaseProps
) => {

    const theme = useTheme();
    const [backgroundVisibility, setBackgroundVisibility] = useState(false);

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
                enableDynamicSizing={enableDynamicSizing}
                enablePanDownToClose={enablePanDownToClose}
                index={index}
                onClose={onClose}
                handleComponent={closeButton ? (props) => {
                    return (
                        <>
                            <BottomSheetHandle {...props} style={{ marginBottom: APP_MARGIN * 4 }} />
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
                {...props}
            >
                {children}
            </BottomSheet>
        </>
    )
}