import { BottomSheetProps, BottomSheetView, } from '@gorhom/bottom-sheet';
import React, { RefObject } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import { MaterialBottomSheetBase } from '@shared/components/bottom-sheet/material-bottom-sheet-base';

export const MaterialBottomSheetView = (
    {
        onClose = () => {},
        onChange,
        bottomSheetRef,
        children,
        snapPoints,
        onAnimate,
        index = -1,
        enablePanDownToClose,
        closeButton = true,
        translucentBackground = true,
        enableDynamicSizing
    }: Omit<BottomSheetProps, 'children'> & {
        bottomSheetRef: RefObject<BottomSheetMethods>,
        children: BottomSheetViewProps['children'],
        closeButton?: boolean,
        translucentBackground?: boolean,
    }) => {

    return (
        <>
            <MaterialBottomSheetBase
                bottomSheetRef={bottomSheetRef}
                enableDynamicSizing={enableDynamicSizing}
                enablePanDownToClose={enablePanDownToClose}
                index={index}
                onClose={onClose}
                snapPoints={snapPoints}
                onAnimate={onAnimate}
                closeButton={closeButton}
                translucentBackground={translucentBackground}
                onChange={onChange}
            >
                <BottomSheetView style={{ flex: 1 }}>
                    {children}
                </BottomSheetView>
            </MaterialBottomSheetBase>
        </>
    )
}