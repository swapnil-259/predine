import React, { useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const BottomSheetComponent = ({ children }) => {
    const snapPoints = useMemo(() => ['90%'], []);
    return (
        <GestureHandlerRootView tw='flex-1 '>
            <BottomSheet
                snapPoints={snapPoints}
            >
                {children}
            </BottomSheet>
        </GestureHandlerRootView >
    )
}