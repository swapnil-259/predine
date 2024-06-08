import React from "react";
import { ActivityIndicator, Modal, View, Text } from "react-native";
import { useContext } from "react";

import { LoaderContext } from '../context/LoaderContext';


const Loader = () => {
    const { loading } = useContext(LoaderContext);
    return (
        <Modal transparent={true}
            visible={loading}
            animationType="none">
            <View tw='fixed top-0 left-0 right-0 m-auto h-10% w-90px'
            >
                <ActivityIndicator size={40} animating={loading} color={'#fff'}></ActivityIndicator>
            </View>
        </Modal>
    )
}
export default Loader