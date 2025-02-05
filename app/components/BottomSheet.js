import BottomSheet from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const BottomSheetComponent = ({children}) => {
  const snapPoints = useMemo(() => ['100%', '90%'], []);
  return (
    <GestureHandlerRootView tw="flex-1 justify-center items-center">
      <BottomSheet snapPoints={snapPoints}>{children}</BottomSheet>
    </GestureHandlerRootView>
  );
};
