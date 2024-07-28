import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { getAuth, signOut } from "firebase/auth";
import { FIREBASE_APP } from "@/config/firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Index = () => {
  const auth = getAuth(FIREBASE_APP);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userinfo");
      router.replace("/");
    } catch (error: any) {
      console.log(error.message);
    }
    ``;
  };
  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
      <TouchableOpacity onPress={() => router.push("/forget-passphrase")}>
        <Text>Quên cụm mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/add-product")}>
        <Text>Thêm Sản Phẩm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
