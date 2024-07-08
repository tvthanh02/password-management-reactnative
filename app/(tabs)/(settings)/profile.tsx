import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

const Profile = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text>Go to setting</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
