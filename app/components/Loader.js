import React, { useContext } from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";

import { LoaderContext } from "../context/LoaderContext";

const Loader = () => {
  const { loading } = useContext(LoaderContext);

  return (
    <Modal transparent={true} visible={loading} animationType="none">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: '90%',
            flexDirection: "row",
            padding: 30,
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
            margin: 20,
          }}
        >
          <ActivityIndicator size={25} animating={loading} color="#FE7240" />
          <Text
            style={{
              color: "#000000",
              alignItems: "center",
              marginLeft: 20,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
