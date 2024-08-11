import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (onBackPress) => {
    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                if (onBackPress) {
                    onBackPress();
                    return true;
                }
                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', backAction);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', backAction);
            };
        }, [onBackPress])
    );
};

export default useBackHandler;
