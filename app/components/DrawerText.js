// CustomDrawerContent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerText = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.headerText}>PREDINE</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 20,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: '#fff'
    },
    headerText: {
        color: '#FE7240',
        fontSize: 20,
        fontFamily: 'Playwrite-FR-Moderne',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default DrawerText;